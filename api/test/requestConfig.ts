import app from '../dist/app';
import request from 'supertest';
const getApp = async () => {
  // @ts-ignore
  await app.locals.appIsReady;
  return request(app);
};
export default getApp;