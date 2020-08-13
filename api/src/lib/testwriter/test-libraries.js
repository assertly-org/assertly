import {jest} from './jest';
const fs = require('fs');
const path = require('path')

export class testWriter {
  constructor(strategy, tests) {
    let strat;
    switch (strategy) {
      case 'jest':
        strat = new jest();
        break;
      default:
        return null;
    }
    this._writeStrategy = strat;
    this._tests = tests;

  }



  // write is a method of the testWriter class
  write(path) {

    return this._writeStrategy.write(path, this._tests);

  }
}