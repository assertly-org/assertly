import { ControllerBase, ControllerProperties, get, post, controller, format, Res } from 'ts-api';
import { testWriter } from '../lib/testwriter/test-libraries';
import path from 'path';
import { createAst, findComponentName, reconcileWithAst } from '../lib/utils';
const fs = require('fs');

/**
 * Test Generation Controller
 */
// @controller('/accounts/:accountId/projects/:projectId/test-generation')
@controller('/accounts/:accountId/events')
export default class TestGeneration extends ControllerBase {

  private input: ControllerProperties;

  constructor(input: ControllerProperties) {
    super(input);
    this.input = input;
  }

  getPathArr(componentPath: string) {
    const pathArr = componentPath.split(/[\\\/]/);

    // remove empty leading ""
    pathArr.shift();

    return pathArr;
  }

  getTestFileName(componentPath: string) {
    const pathArr = this.getPathArr(componentPath);

    const originalFile = pathArr.pop();
    const extensionPattern = /\.[0-9a-z]+$/i;
    const extension = originalFile.match(extensionPattern)[0];

    let fileName = originalFile.replace(extension, `.spec${extension}`);

    // convert js -> jsx for now
    if (extension.charAt(extension.length - 1) !== 'x') {
      fileName += 'x';
    }

    return fileName;
  }

  @post('')
  async createTest(event: Array<any>): Promise<any> {
    try {
      const readPromises: Promise<any>[] = [];

      if (!event) {
        this.input.res.send({ message: 'no test to generate' });
        return;
      }

      event.forEach(event => readPromises.push(reconcileWithAst(event)));
      const reconciledEvents = await Promise.all(readPromises);
      // console.log('reconciled event', reconciledEvents);

     

      const jestTestWriter = new testWriter('jest', reconciledEvents);
      let unitTests: any;

      unitTests = jestTestWriter.write();

      // this.input.res.send({ast: fileAst});

    } catch (e) {
      if (e instanceof TypeError) {
        console.log(`Error creating test, it is likely the item selected was not a React Component.`);
      } else {
        console.error('createTest error: ', e);
      }
      this.input.res.sendStatus(500);
      return;
    }
    return {
      success: true
    };
  }
}
