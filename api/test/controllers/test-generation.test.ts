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
    // filename of test file will be populated in the test
    filename: '',
    linenumber: 8,
    props: { variant: 'primary', size: 'lg', onClick: '[Function]' },
    componentName: 'WrapperButton',
    isDefaultExport: true
  },
  componentInfo: {
    // filename of test file will be populated in the test
    filename: '',
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

  it('should return a 200 on a component written in js', async (done) => {
    const request = await getApp();
    request
      .post(`/api/accounts/${buildData.accountId}/events`)
      .send( await (async () => {
        await createFakeComponent(testEvent, 'js')
        return {event: testEvent}
      })())
      .end(function(err, res) {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should return a 200 on a component written in ts', async (done) => {
    const request = await getApp();
    request
      .post(`/api/accounts/${buildData.accountId}/events`)
      .send( await (async () => {
        await createFakeComponent(testEvent, 'ts')
        return {event: testEvent}
      })())
      .end(function(err, res) {
        expect(res.status).toBe(200);
        done();
      });
  });
});

const createFakeComponent = async (testEvent: any, fileExtension: string) => {

  if (fs.existsSync(`api/test/controllers/testComponent.${fileExtension}`)) {
    fs.unlinkSync(`api/test/controllers/testComponent.${fileExtension}`);
  }

  if (fileExtension === 'ts') {
    await writeFileAsync('api/test/controllers/testComponent.ts', `export interface User {
      name: string;
      id: number;
    }`);

    // objects are passed by reference, and may be edited inside a function
    testEvent.componentInfo.filename = 'api/test/controllers/testComponent.ts'
    testEvent.clickHandlerComponent.filename = 'api/test/controllers/testComponent.ts'

  } else if (fileExtension === 'js') {
    await writeFileAsync('api/test/controllers/testComponent.js', `export class foo {}`);

    // objects are passed by reference, and may be edited inside a function
    testEvent.componentInfo.filename = 'api/test/controllers/testComponent.js'
    testEvent.clickHandlerComponent.filename = 'api/test/controllers/testComponent.js'

  }

}

