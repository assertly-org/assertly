const chai = require('chai');
const expect = chai.expect;
const Promise = require('bluebird');

require('dotenv').config();
const pg = require('pg');
const pgClient = require('../index');

describe('idle-in-transaction queries', () => {
  let pgTmplLib;
  let clientErrored = false;
  const connString = process.env.DB_CONN_STRING;

  it('Initiates the library', () => {
    pgTmplLib = pgClient(pg, connString);
    expect(typeof pgTmplLib.sqlTemplate).to.equal('function');
    expect(typeof pgTmplLib.pgPool).to.equal('object');
  });

  let client;
  it('Creates a client', () => {
    client = new pg.Client(pgTmplLib.pgConfig);
    expect(typeof client.connect).to.equal('function');
  });

  let transaction;
  it('Starts a transaction and idles', async () => {
    transaction = await client.transactionStart();
    console.log('transaction started');
    await transaction.queryAsync('set session idle_in_transaction_session_timeout = 100');
    console.log('idle timeout set');
  });  

  it('Reports queries that fail from idle', async () => {
    await transaction.queryAsync('select 1');
    console.log('query added to transaction');
    clientErrored = true;
    await Promise.delay(200);
    expect(transaction.lastQuery).to.be.an('object');
    expect(transaction.lastQuery.query).to.equal('select 1');
  });  

  after(() => {
    if (client && !clientErrored) {
      try {
        if (transaction) {
          transaction.rollback();
        }  
        client.end();
      } catch (e) {}
    }  
  });  
});

