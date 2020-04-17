
const pg = require('pg');
const uuidLib = require('uuid/v1');

const uuid = uuidLib();

/*
 * Subscribe to a Postgres LISTEN/NOTIFY channel with reconnection and backoff
 *   Even with docker, the volume of connections are low enough we don't need variable retires/jitter.
 *   At a scale where that is necessary - we should be using a more advanced pub/sub system instead. 
*/
const defaultBackoff = 500;
const subscribeToChannel = (pgConnectionString, channelName, callback, subscribeAttemptCount, backoff) => {

  let pgConnection = new pg.Client(pgConnectionString);
  pgConnection.connect((err) => {
    if (err) {
      console.log('LISTEN/NOTIFY connection error: ', err);
    } 

    pgConnection.on('notification',function(msg) {
        // if a successful message than any backoff goes back to default
        backoff = defaultBackoff;

        if (msg && msg.payload && msg.payload.match(`pingCount`)) {
          const payload = JSON.parse(msg.payload);
          if (payload.uuid === uuid) {
            pingReceivedCount++;
          }
        } else {
          // callback is the actual business logic handler for receiving a message
          callback(msg,function(err) { if(err) client.end(); });
        }
    });

    // reconnect logic after catching an error
    const handleError = function(error) {  
      console.log('LISTEN/NOTIFY error: ', error);
      if(errorActive[channelName] === true) {
          return;
      } else {
        backoff *= 2;
        if (backoff > 8000) backoff = 8000;

        // the errorActive handles the nodejs eventEmitter flooding with parallel errors
        //   which occurs when resuming from sleep on windows 
        if (errorActive[channelName] != true) {
            errorActive[channelName] = true;
            try {
              pgConnection.end().catch(function(e) {
                console.log('pgConnection in LISTEN/NOTIFY already ended before trying to end()');
              })
            } catch(e) {
              console.log('pgConnection in LISTEN/NOTIFY already ended before trying to end()');
            }
            if (pgConnection.pingChecker) {
              clearInterval(pgConnection.pingChecker);
            }
            pgConnection = null;
            setTimeout(function () {
                subscribeToChannel(pgConnectionString, channelName, callback, subscribeAttemptCount++, backoff);
                errorActive[channelName] = false;
            }, backoff);
        }
      }
    };

    // node eventemmiter handler
    pgConnection.on('error', handleError);

    let pingCount = 0;
    let pingReceivedCount = 0;
    const setupPingCheck = function(channelName) {
      pgConnection.pingChecker = setInterval(function() {

        if (pingCount !== pingReceivedCount) {
          handleError(`Missed a ping for channel ${channelName}. Count expected ${pingCount} vs received ${pingReceivedCount}. Reconnecting LISTEN/NOTIFY!`);
          return;
        }

        pingCount++;
        pgConnection.query(`select pg_notify('${channelName}', '{"pingCount": ${pingCount}, "uuid": "${uuid}"}')`);
      }, 60000);
    }

    pgConnection.query("LISTEN " + channelName,function(err) {
       // this happens one-time so does not flood like the error listener above
       if (err) {
         pgConnection.end();
         pgConnection = null;
         setTimeout(function() {
             subscribeToChannel(pgConnectionString, channelName, callback, subscribeAttemptCount++, backoff);
         }, backoff);
       } else {
         setupPingCheck(channelName);
       }
    });

  });
}

// scope errorActive and backoff to specific channel usage
let errorActive = {};
const subscribeToChannelWrapper = (pgConnectionString, channelName, callback, subscribeAttemptCount = 0) => {
  let backoff = defaultBackoff;
  errorActive[channelName] = false;
  subscribeToChannel(pgConnectionString, channelName, callback, subscribeAttemptCount, backoff);
}

module.exports = subscribeToChannelWrapper;

