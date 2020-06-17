import { ControllerBase, ControllerProperties, get, post, controller, format, Res } from 'ts-api';
import { testWriter } from '../lib/testwriter/test-libraries';
import path from 'path';
import fs from 'fs';
import * as recast from 'recast';

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

  createAst(event: Array<any>) {

    event.map(val => {
      if (fs.existsSync(val.filename)) {
        fs.readFile(val.filename, 'utf8', function(err, data) {
          if (err) throw err;

          console.log(data);
          // console.log(recast.parse(`console.log('hello world')`, {
          // console.log(recast.parse(`export default class AssertlyClient implements ClientInterface {}`, {
          console.log(recast.parse(data, {
            // parser: require('recast/parsers/typescript')
            parser: {
              parse(data: any) {
                return require('recast/parsers/typescript').parse(data, {
                  // additional options note only sourcetype and strictmode are taken, added jsx to the plugins in node_modules **manually** _babel_options.js
                });
              }}
          }));
      });
      } else {
        console.log(`can't find the file`, val.filename);
      }
    });
  }

  @post('')
  async createTest(event: Array<any>, placeholder: string): Promise<any> {
    try {
      if (!event) {
        this.input.res.send({ message: 'no test to generate' });
        return;
      }
      console.log('this is the event sent', event);

      // this.createAst(event);
      // console.log(recast.parse(`export default class AssertlyClient implements ClientInterface {}`), {
      //   parser: require("recast/parsers/typescript")
      // })
      const jestTestWriter = new testWriter('jest', event);
      let unitTests: any;
      unitTests = jestTestWriter.write(path.join(__dirname, '../../assertly_generated_tests'));
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

