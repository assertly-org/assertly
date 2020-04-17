"use strict"

const url = require('url');

/**
 * Parse a Postgres connection string into a database configuration object. 
 * In the event a domain prefix is present, such as "abc\\", remove that from
 * the string before parsing because url.parse cannot parse that properly, then
 * add it back to the username for properly connecting to Postgres. 
 * @return config object
 */
module.exports = function(connectionString) {
  const domainPrefixRegex = /(\w+\\)/;
  const domainMatches = connectionString.match(domainPrefixRegex);
  let parseableConnectionString = connectionString;
  let domain = '';

  if (domainMatches) {
    domain = domainMatches[0];
    parseableConnectionString = parseableConnectionString.replace(domain, '');
  }

  const connParams = url.parse(parseableConnectionString);
  const auth = connParams.auth.split(':');

  const config = {
    user: domain + auth[0],
    password: auth[1],
    host: connParams.hostname,
    port: connParams.port,
    database: connParams.path.substring(1)
  };

  return config;
}