import express from 'express';
import { initAppStartup } from './lib';

const app = express();

// initialize context and middleware
app.locals.appIsReady = initAppStartup(app)
  .catch((err: any) => {
    console.error('Error in initAppStartup: ', err);
    throw new Error(err);
  });

export default app;
