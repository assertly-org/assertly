import path from 'path';

// @ts-ignore
import getApp from '../requestConfig';

const buildData = {
  requestId: '',
  accountId: '39e760b1-d282-44d3-94d0-8d538b4904ae',
  fileUrl: '',
  fileEndpoint: ''
};
describe('Event fetch', () => {
  it('should require a filepath', async (done) => {
    const request = await getApp();
    request
      .get(`/api/accounts/${buildData.accountId}/events`)
      .end(function(err, res) {
        expect(res.status).toBe(400);
        done();
      });
  });

  it('should return a 500 on an invalid file', async (done) => {
    const request = await getApp();
    request
      .get(`/api/accounts/${buildData.accountId}/events/`)
      .query({
        filepath: ''
      })
      .end(function(err, res) {
        expect(res.status).toBe(500);
        done();
      });
  });

  it('should fetch tests in a given file', async (done) => {
    console.log('__dirname', __dirname);
    const testPath = path.resolve(__dirname, 'test-generation.test.ts')
    console.log('testPath', testPath);
    console.log('cwd', process.cwd());

    const request = await getApp();
    request
      .get(`/api/accounts/${buildData.accountId}/events/`)
      .query({
        filepath: testPath
      })
      .end(function(err, res) {
        expect(res.status).toBe(200);
        done();
      });
  });
});