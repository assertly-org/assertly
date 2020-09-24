import { ControllerBase, ControllerProperties, get, post, controller, format, Res, put } from 'ts-api';
import { testWriter } from '../lib/testwriter/test-libraries';
import path from 'path';
import { reconcileWithAst, findTestWriteInfo, findDescribeBlocks } from '../lib/utils';
import { validateLocaleAndSetLanguage } from 'typescript';


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

  @post('')
  async createTest(event: Array<any>): Promise<any> {
    try {
      const astPromises: Promise<any>[] = [];

      if (!event) {
        this.input.res.send({ message: 'no test to generate' });
        return;
      }

      event.forEach(event => astPromises.push(reconcileWithAst(event)));

      const astReconciledEvents = await Promise.all(astPromises);

      const jestTestWriter = new testWriter('jest', astReconciledEvents);
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

  // takes a array of objects with filepaths and will return the objects with appended keys for whether the file exists
  // and the various describe / it blocks
  @get('')
  async checkExistingTest(filepath: string): Promise<any> {
    try {
      // find the location of the existing tests
      const writeInfo = await findTestWriteInfo(filepath);

      // find describe blocks if there is an existing test
      let describeBlocks;
      writeInfo.existingFile ? describeBlocks = await findDescribeBlocks(writeInfo) : describeBlocks = undefined;
      console.log('describe blocks: ', writeInfo, describeBlocks);
      return {
        describeBlocks: describeBlocks,
        checkedEvent: writeInfo,
        success: true
      };

    } catch (e) {
      console.error('Error checking for existing test');
      this.input.res.sendStatus(500);
      return;
    }



  }

  // takes an array of objects with component names and the describe block to replace/update
  // will update those tests with the information given
  @put('')
  async updateTest(componentPaths: Array<any>): Promise<any> {
  }
}
