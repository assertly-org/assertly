import { ControllerBase, ControllerProperties, get, post, controller, format, Res } from 'ts-api';
import { testWriter } from '../lib/testwriter/test-libraries';
import path from 'path';

/**
 * Test Generation Controller
 */
@controller('/accounts/:accountId/projects/:projectId/test-generation')
export default class TestGeneration extends ControllerBase {

  private input: ControllerProperties;

  constructor(input: ControllerProperties) {
    super(input);
    this.input = input;
  }

  @post('')
  async createTest(event: object): Promise<any> {
    try {
      if (!event) {
        this.input.res.send({message: 'no test to generate'});
        return;
      }
      console.log('this is the event sent', event);
      const jestTestWriter = new testWriter('jest', event);
      let unitTests: any;
      unitTests = jestTestWriter.write();
    } catch (e) {
      console.error('createTest error: ', e);
      this.input.res.sendStatus(500);
      return;
    }
    return {
      success: true
    };
  }
}

