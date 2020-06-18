import { ControllerBase, ControllerProperties, get, post, controller, format, Res } from 'ts-api';
import { testWriter } from '../lib/testwriter/test-libraries';
import path from 'path';
import { createAst, findComponentNames } from '../lib/utils';

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
  async createTest(event: Array<any>, placeholder: string): Promise<any> {
    try {
      if (!event) {
        this.input.res.send({ message: 'no test to generate' });
        return;
      }
      console.log(event);

      const fileAst: any = await createAst(event);
      if (fileAst?.errno) throw fileAst;

      const componentNames: any = await findComponentNames(fileAst, event);

      console.log(fileAst);

      const jestTestWriter = new testWriter('jest', event);
      let unitTests: any;
      unitTests = jestTestWriter.write(path.join(__dirname, '../../assertly_generated_tests'));

      this.input.res.send({ast: fileAst});

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

// console.log(recast.parse(data, {
//   // parser: require('recast/parsers/typescript')
//   parser: {
//     parse(data: any) {
//       return require('recast/parsers/typescript').parse(data, {
//         // additional options note only sourcetype and strictmode are taken, added jsx to the plugins in node_modules **manually** _babel_options.js
//       });
//     }}
// }));

// await Promise.all(event.map(val => {
//   if (fs.existsSync(val.filename)) {
//     try {
//       data = fs.readFileSync(val.filename, 'utf8');
//     } catch (err) {
//       console.log(`error reading file`);
//     }
//     astArray.push(babelparser.parse(data, babeloptions));
//   } else {
//     console.log(`can't find the file`, val.filename);
//   }
// }));