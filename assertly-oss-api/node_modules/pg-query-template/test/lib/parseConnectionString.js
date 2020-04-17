"use strict";

const chai = require('chai');
const expect = chai.expect;
const parseConnectionString = require('../../lib/parseConnectionString');

describe('parseConnectionString module', () => {
  it('parses a URL into a database config object', () => {
    const connectionString = 'postgres://username:password@123.123.123.123/db_name';

    const connectionParts = parseConnectionString(connectionString);

    expect(connectionParts.user).to.equal('username');
    expect(connectionParts.password).to.equal('password');
    expect(connectionParts.host).to.equal('123.123.123.123');
    expect(connectionParts.port).to.be.null;
    expect(connectionParts.database).to.equal('db_name');
  });

  it('parses a URL with a domain controller prefix into a database config object', () => {
    const connectionString = 'postgres://domain\\username:password@123.123.123.123/db_name';

    const connectionParts = parseConnectionString(connectionString);

    expect(connectionParts.user).to.equal('domain\\username');
    expect(connectionParts.password).to.equal('password');
    expect(connectionParts.host).to.equal('123.123.123.123');
    expect(connectionParts.port).to.be.null;
    expect(connectionParts.database).to.equal('db_name');
  });  
});
