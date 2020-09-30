// @ts-ignore
import getApp from './requestConfig';
describe('GET /random-url', () => {
  it('should return 404', async (done) => {
    const request = await getApp();
    request.get('/reset')
      .expect(404);
    done();
  });
});