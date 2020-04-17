import express from 'express';
import * as bodyParser from 'body-parser';

export const initMiddleware = function(app: express.Application) {
  app.options('*', function corsPreflight(req, res) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    res.status(200).end();
  });

  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
  });

  app.use(bodyParser.urlencoded({ extended: false, limit: '20mb' }));
  app.use(bodyParser.json({ limit: '20mb'}));

};
