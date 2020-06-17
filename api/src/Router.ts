import express from 'express';
import { RouterBase, router } from 'ts-api';

/**
 * Assertly
 */
@router('/api')
export class Router extends RouterBase {
  constructor(app: any) {
    super(app.locals);
    require('./__routes')(this);

    app.use('/api/test-coverage', express.static(__dirname + '/../coverage/lcov-report'));
    app.use('/api/assertly-client', express.static(__dirname + '/../../client/public/client/lib'));

  }
}
