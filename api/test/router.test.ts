// @ts-ignore
import getApp from './requestConfig';
describe('GET /docs/', () => {
  it('should return 200', async (done) => {
    const req = await getApp();
    req.get('/api/docs/')
      .expect(200, done);
  });
});