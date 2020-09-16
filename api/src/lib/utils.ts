import * as babelparser from '@babel/parser';
import fs from 'fs';
import { ParserOptions } from '@babel/parser';
import path from 'path';
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

export async function reconcileWithAst(event: any) {

  let fileAst: any;
  let isDefaultExport: boolean;

  if (event?.componentInfo?.filename) {
    fileAst = await createAst(event?.componentInfo?.filename);
    isDefaultExport = findIsDefaultExport(fileAst);
    event.componentInfo.isDefaultExport = isDefaultExport;
  }

  if (event?.clickHandlerComponent?.filename) {
    fileAst = await createAst(event?.clickHandlerComponent?.filename);
    isDefaultExport = findIsDefaultExport(fileAst);
    event.clickHandlerComponent.isDefaultExport = isDefaultExport;
  }

  return event;
}

export async function findTestWriteInfo(event: any) {
  let testWritePath = '';
  const envPath = await findEnvPath(path.dirname(event?.componentInfo?.filename));
  const testFileName = getTestFileName(event?.componentInfo?.filename);

  console.log('right before findwritePath12345', envPath);
  // figure out the path to write the test
  if (envPath) {
    testWritePath = envPath;
  } else {
    console.log('right before findwritePath');
    testWritePath = await findWritePath(
      path.dirname(event?.componentInfo?.filename),
      10,
      path.dirname(event?.componentInfo?.filename),
    );
  }
  if (testWritePath.slice(-1) !== '/') testWritePath = testWritePath.concat('/');
  return {writePath: testWritePath, testFileName};
}

async function createAst(filename: string) {

  let data: string;
  let ast: object;

  data = await fs.promises.readFile(filename, 'utf8');
  ast = babelparser.parse(data, babeloptions);

  return ast;
}

function findIsDefaultExport(ast: any): boolean {

  for (let i = 1; i < ast?.tokens?.length; i++) {
    if (ast.tokens[i ].value === 'default' && ast.tokens[i - 1].value === 'export') {
      return true;
    }
  }

  return false;
}

async function findEnvPath(componentDir: string) {
  const environment_set_path = process.env.ASSERTLY_DIRECTORY;
  let combined_path = undefined;


  if (!environment_set_path) {
    combined_path = componentDir;
  } else if (path.isAbsolute(environment_set_path)) {
    combined_path = environment_set_path;
  } else {
    combined_path = path.join(componentDir, environment_set_path);
  }
  // console.log(environment_set_path, componentDir, combined_path);
  const exists = await checkFilePath(combined_path);

  if (exists) {
    return combined_path;
  } else {
    return undefined;
  }
}

async function checkFilePath(filePath: string) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

async function findWritePath(filePath: string, maxDepth: any, componentPath: string): Promise<any> {
  // exit recursion if directory does not exist
  // or root path is reached
  // or max recursion level reached

  // the ENV variable is checked before this method is run, if the ENV variable
  // points to a valid location, the envPath is used and this method is never invoked
  console.log('recursed! ', filePath);
  const filePathExists = await checkFilePath(filePath);

  if (!filePathExists || filePath === '/' || maxDepth < 0) {
    // console.log('exit condition reached')
    return componentPath;
  }

  const gitFile = path.join(filePath, '.git');
  const configFile = path.join(filePath, 'jest.config.js');
  const gitExists = await checkFilePath(gitFile);
  const configExists = await checkFilePath(configFile);

  // check for the existence of the jest config file
  if (configExists) {
    // console.log('found jest config', filePath)
    const configs = require(configFile);

    // if it does exist, check if it has the rootDir key
    if (configs?.rootDir) {
      const jestLocation = path.join(filePath, configs?.rootDir);
      const jestLocationExists = await checkFilePath(jestLocation);
      if (jestLocationExists) {
        return jestLocation;
      } else {
        return componentPath;
      }
    } else {
      return componentPath;
    }
    // check if the git file is reached
  } else if (gitExists) {
    // console.log('found git file', filePath)
    return componentPath;
    // recurse up the tree
  } else {
    return await findWritePath(
      path.dirname(filePath),
      maxDepth - 1,
      componentPath,
    );
  }
}

function getPathArr(componentPath: string) {
  const pathArr = componentPath.split(/[\\\/]/);

  // remove empty leading ""
  pathArr.shift();

  return pathArr;
}

function getTestFileName(componentPath: string) {
  const pathArr = getPathArr(componentPath);

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

function findComponentName(ast: any, lineNumber: number): string {
  let astName: string;
  for (let i = 1; i < ast?.tokens?.length; i++) {
    if (ast.tokens[i - 1].value === 'class' || ast.tokens[i - 1].value === 'function') {
      astName = ast.tokens[i].value;
    }
    if (ast.tokens[i].loc.start.line === lineNumber) break;
  }
  return astName;
}