"use strict";

const Promise = require('bluebird');
const _ = require('lodash');
const Cursor = require('pg-cursor');
const parseConnectionString = require('./lib/parseConnectionString');
const listenNotifyClient = require('./lib/listenNotifyClient');
const pgPools = {};

/*
  See readme for an overview
 */
module.exports = function (pg, configInput) {

  let config = configInput;
  if (configInput.pg_conn_string && !configInput.database) {
    config = _.merge(config, parseConnectionString(config.pg_conn_string));
  }

  const connIdentifier = createConnIdentifier(config);

  const pool = new pg.Pool(config);
  pgPools[connIdentifier] = pool;

  /*
    global logging -------------------------------
   */
  pool.on('error', function (error, client) {
    try {
      let lastQuery;
      if (client) {
        lastQuery = client.lastQuery;
      }
      console.error('pg-pool error after last query: ', lastQuery);
      console.error('pg-pool error: ', error);
    } catch (e) {
      console.error('Could not log a postgres error due to circular json');
    }
  });

  // ---------------------------------------------

  // attaching method to pg.Client so all the APIs that use a singleton pgClient.queryAsync will use connection pooling
  pg.Client.prototype.queryAsync = Promise.promisify(function (query, bindVars, queryCB) {

    let client = this;
    const connName = createConnIdentifier((client.connectionParameters));
    // if no bind vars
    if (queryCB == undefined) {
      queryCB = bindVars;
      bindVars = [];
    }

    if (this.inTransaction) {
      client.lastQuery = {query, bindVars};
      client.query(query, bindVars, queryCB);
    } else {
      pgPools[connName].connect(function (connectErr, pgClient, connectFinishFn) {
        if (connectErr) {
          console.error('database connection error: ', connectErr);
          connectFinishFn(connectErr);
        } else {
          pgClient.connName = client.connName;
          pgClient.lastQuery = {query, bindVars};
          pgClient.query(query, bindVars, function (err, queryRes) {
            connectFinishFn();
            queryCB(err, queryRes);
          });
        }
      });
    }
  });

  // grab client from pool, then create begin transaction
  pg.Client.prototype.transactionStart = Promise.promisify(function (cb) {
    let client = this;
    const connName = createConnIdentifier((client.connectionParameters));

    pgPools[connName].connect(function (connectErr, pgClient, connectFinishFn) {
      if (!connectErr) {
        pgClient.connName = client.connName;
        pgClient.returnClientToPool = connectFinishFn;
        pgClient.inTransaction = true;
        pgClient.query('BEGIN', function (err, beginResult) {
          cb(connectErr, pgClient);
        });
      } else {
        console.error('transactionStart during pool.connect', connectErr);
      }
    });
  });

  // commit + return client to connection pool
  pg.Client.prototype.commit = Promise.promisify(function (cb) {
    let client = this;
    client.inTransaction = false;
    client.query('COMMIT', function (err, commitResult) {
      client.returnClientToPool();
      cb(err, commitResult);
    });
  });

  // rollback + return client to connection pool
  pg.Client.prototype.rollback = Promise.promisify(function (cb) {
    let client = this;
    client.inTransaction = false;
    client.query('ROLLBACK', function (err, rollbackResult) {
      client.returnClientToPool();
      cb(err, rollbackResult);
    });
  });

  /* lodash template handling
   *   since template strings do not allow templates-within-templates
   *   and a shortcut way to just inject blocks of sql that is trusted (i.e. not input from ajax call)
   */
  const convertHandlebarsTemplateToQuery = function (obj, substVals) {
    if (substVals) {
      let numSubstTries = 0;
      while (numSubstTries < 5 && obj.query.match(/{{/)) {
        _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
        let compiled = _.template(obj.query);
        obj.query = compiled(substVals);
        numSubstTries++;
      }
    }
  };

  // adds the main method to the pg client class for querying data in this simplified bind variables design
  pg.Client.prototype.queryTmpl = function (obj, substVals) {

    convertHandlebarsTemplateToQuery(obj, substVals);

    let me = this;
    let queryWrapper = new Promise(function (resolve, reject) {
      pg.Client.prototype.queryAsync.call(me, obj.query, obj.values)
        .then(function (queryResult) {
          queryResult = _.pick(queryResult, ['rowCount', 'rows']);
          resolve(queryResult);
        })
        .catch(function (e) {
          console.error('query error in promise', e);
          reject(e);
        });
    });

    return queryWrapper;
  };

  /*
    Cursors are a postgresql features that allows nodejs to read data in a stream

    The bulk of the logic here is to create a transaction
      and remove statement timeout settings for cursors since they meant to be are read-only long running
   */

  const cursorQuery = function (query, bindVars, cursorCreateCB) {

    let client = this;
    const connName = createConnIdentifier((client.connectionParameters));

    pgPools[connName].connect(function (connectErr, pgClient, connectFinishFn) {
      pgClient.connName = client.connName;
      pgClient.query('BEGIN', function (transactionBeginErr) {
        if (transactionBeginErr) {
          console.error('query error begining transaction', transactionBeginErr);
          return connectFinishFn(err);
        }

        // cursors are meant to stream bulk data so no timeout
        pgClient.query('SET statement_timeout = 0', function (timeoutErr, setTimeoutRes) {
          if (timeoutErr) {
            console.error('error setting the postgres statement_timeout setting', timeoutErr);
            pgClient.query('ROLLBACK', function (rollbackErr, rollbackResult) {
              console.error('rolling back transaction', rollbackErr);
              return connectFinishFn(err);
            });
          }

          let cursor = pgClient.query(new Cursor(query, bindVars));
          cursor.endConnection = connectFinishFn;

          cursor.readAsync = Promise.promisify(function (numRows, readWrapperCB) {

            cursor.read(numRows, function (cursorReadErr, rows) {
              if (cursorReadErr) {
                console.error('cursor read error', cursorReadErr);
                pgClient.query('ROLLBACK', function (rollbackErr, rollbackResult) {
                  console.error('rollback after cursor read error done');
                  connectFinishFn(rollbackErr);
                  return readWrapperCB(rollbackErr);
                });
              } else if (!rows.length) {
                pgClient.query('COMMIT', function (commitErr) {
                  if (commitErr) {
                    console.error('error committing cursor transaction', commitErr);
                  }
                  connectFinishFn();
                });
                return readWrapperCB(null, rows);
              } else {
                readWrapperCB(null, rows);
              }
            });
          });

          cursorCreateCB(connectErr, cursor);
        });
      });
    });
  };

  pg.Client.prototype.cursorAsync = Promise.promisify(cursorQuery);

  // parallel wrapper of queryTmpl but for cursors
  pg.Client.prototype.cursorTmpl = Promise.promisify(function (obj, substVals, cursorCB) {

    // if no bind vars
    if (cursorCB == undefined) {
      cursorCB = substVals;
      substVals = [];
    }

    convertHandlebarsTemplateToQuery(obj, substVals);

    cursorQuery(obj.query, obj.values, cursorCB);
  });

  // convert @param pieces (arguments to sqlTemplate) to bind variable strings
  //   such as $1 and ['foo']
  const sqlTemplate = pg.Client.prototype.sqlTmpl = function (pieces) {
    let result = '';
    let vals = [];
    let substitutions = [].slice.call(arguments, 1);
    for (let i = 0; i < substitutions.length; ++i) {
      result += pieces[i] + '$' + (i + 1);
      vals.push(substitutions[i]);
    }

    result += pieces[substitutions.length];

    return {query: result, values: vals};
  };

  // wrapper for lib to share the existing connection string for general postgres pool
  pg.Client.prototype.listenNotify = function (channelName, callback) {
    listenNotifyClient(config.pg_conn_string, channelName, callback);
    return {success: true}
  };

  return { pool, config, pgClient: pg.Client, sqlTemplate };
};

function createConnIdentifier(config) {
  return `${config.user}${config.host}${config.port ? config.port : 5432}${config.database}`;
}
