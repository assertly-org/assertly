import * as babelparser from '@babel/parser';
import fs from 'fs';
import { ParserOptions } from '@babel/parser';
import { File } from '@babel/types';

const babeloptions: ParserOptions = {
  sourceType: 'module',
  strictMode: false,
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
      'asyncGenerators',
      'bigInt',
      'classPrivateMethods',
      'classPrivateProperties',
      'classProperties',
      'decorators-legacy',
      'doExpressions',
      'dynamicImport',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'functionBind',
      'functionSent',
      'importMeta',
      'nullishCoalescingOperator',
      'numericSeparator',
      'objectRestSpread',
      'optionalCatchBinding',
      'optionalChaining',
      ['pipelineOperator', { proposal: 'minimal' }],
      'throwExpressions',
      'jsx'
  ]
};

export async function createAst(filename: string) {

  let data: string;
  let ast: object;

  try {
    data = await fs.promises.readFile(filename, 'utf8');
  } catch (err) {
    console.log(`error reading file`);
    return err;
  }

  ast = babelparser.parse(data, babeloptions);

  return ast;
}

export async function reconcileWithAst(event: any) {

  const fileAst: any = await createAst(event?.filename);
  const astComponentName = findComponentName(fileAst, event?.linenumber);

  return {...event, astComponentName: astComponentName};
}

export function findComponentName(ast: any, lineNumber: number): string {
  let astName: string;
  for (let i = 1; i < ast?.tokens?.length; i++) {
    if (ast.tokens[i - 1].value === 'class' || ast.tokens[i - 1].value === 'function') {
      astName = ast.tokens[i].value;
    }
    if (ast.tokens[i].loc.start.line === lineNumber) break;
  }
  return astName;
}