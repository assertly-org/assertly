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

export async function createAst(event: Array<any>) {

  const astArray: File[] = [];
  const readPromises: Promise<any>[] = [];
  let fileArray: string[];

  event.forEach(event => readPromises.push(fs.promises.readFile(event.filename, 'utf8')));

  // readFile will error out if file does not exist
  try {
    fileArray = await Promise.all(readPromises);
  } catch (err) {
    console.log(`error reading file`);
    return err;
  }

  fileArray.forEach(file => astArray.push(babelparser.parse(file, babeloptions)));

  return astArray;
}

export function findComponentNames(astArray: Array<any>, event: Array<any>): string[] {
  return ['durka'];
}