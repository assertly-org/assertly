import { ControllerBase, ControllerProperties, get, post, controller, format, Res } from 'ts-api';
import { testWriter } from '../lib/testwriter/test-libraries';
import path from 'path';
import { reconcileWithAst, findTestWriteInfo } from '../lib/utils';


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
      const writeInfoPromises: Promise<any>[] = [];

      if (!event) {
        this.input.res.send({ message: 'no test to generate' });
        return;
      }

      event.forEach(event => astPromises.push(reconcileWithAst(event)));
      event.forEach(event => writeInfoPromises.push(findTestWriteInfo(event)));

      const reconciledEvents = await Promise.all(astPromises);
      const writeInfo = await Promise.all(writeInfoPromises);

      console.log('write info event return', writeInfo);



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
