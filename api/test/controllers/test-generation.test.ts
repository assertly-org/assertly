import path from 'path';
const fs = require("fs");
const {promisify} = require("util");
const writeFileAsync = promisify(fs.writeFile);
// @ts-ignore
import getApp from '../requestConfig';

const buildData = {
  accountId: '39e760b1-d282-44d3-94d0-8d538b4904ae'
};

const testEvent = 
 {
  action: 'click',
  tagName: 'BUTTON',
  tagType: 'button',
  textContent: 'Add',
  timestamp: 1600956804615,
  value: '',
  writeTestLocation: '',
  clickHandlerComponent: {
    filename: 'api/test/controllers/testComponent.js',
    linenumber: 8,
    props: { variant: 'primary', size: 'lg', onClick: '[Function]' },
    componentName: 'WrapperButton',
    isDefaultExport: true
  },
  componentInfo: {
    filename: 'api/test/controllers/testComponent.js',
    linenumber: 8,
    props: { variant: 'primary', size: 'lg', onClick: '[Function]' },
    componentName: 'WrapperButton',
    isDefaultExport: true
  },
  checkedEvent: {
    testWriteDir: 'api/test/controllers/',
    testFileName: 'test.spec.jsx',
    existingFile: true
  }
}

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

describe('Event post', () => {
  it('should require an event', async (done) => {
    const request = await getApp();
    request
      .post(`/api/accounts/${buildData.accountId}/events`)
      .end(function(err, res) {
        expect(res.status).toBe(400);
        done();
      });
  });

  it('should return a 500 on an invalid event', async (done) => {
    const request = await getApp();
    request
      .post(`/api/accounts/${buildData.accountId}/events`)
      .send({event: 99999})
      .end(function(err, res) {
        expect(res.status).toBe(500);
        done();
      });
  });

  it('should return a 200 on an valid event', async (done) => {
    const request = await getApp();
    request
      .post(`/api/accounts/${buildData.accountId}/events`)
      .send( await (async () => {
        await createFakeComponent(testEvent)
        return {event: testEvent}
      })())
      .end(function(err, res) {
        expect(res.status).toBe(200);
        done();
      });
  });
});

const createFakeComponent = async (testevent: any) => {

  if (fs.existsSync('api/test/controllers/testComponent.js')) {
    fs.unlinkSync('api/test/controllers/testComponent.js');
  }
      // write the file
  await writeFileAsync('api/test/controllers/testComponent.js', 'mock component');

}

