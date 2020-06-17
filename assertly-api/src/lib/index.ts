import express from 'express';
import { initMiddleware } from './middleware';
import { Router as ApiRouter } from '../Router';

export const initAppStartup = async function(app: express.Application) {

  // middleware injected before result-sending endpoints
  initMiddleware(app);

  // mount ts-api routes
  const apiRouter = new ApiRouter(app);
  app.use(apiRouter.getExpressRouter());
};
