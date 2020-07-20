import { ControllerBase, ControllerProperties, get, post, controller, format, Res } from 'ts-api';
import { testWriter } from '../lib/testwriter/test-libraries';
import path from 'path';
import { createAst, findComponentName, reconcileWithAst } from '../lib/utils';

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
      const readPromises: Promise<any>[] = [];

      if (!event) {
        this.input.res.send({ message: 'no test to generate' });
        return;
      }

      // event.forEach(event => readPromises.push(reconcileWithAst(event)));
      // const reconciledEvents = await Promise.all(readPromises);
      // console.log('reconciled event', reconciledEvents);

      const jestTestWriter = new testWriter('jest', event);
      let unitTests: any;
      unitTests = jestTestWriter.write(path.join(__dirname, '../../assertly_generated_tests/'));

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
