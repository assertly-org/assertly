const {promisify} = require("util");
const fs = require("fs");
const path = require("path");

const writeFileAsync = promisify(fs.writeFile);

import prettier from "prettier";

export class jest {
  constructor() {
    this._maxRecurse = 10;
  }

  async findEnvPath(componentDir) {
    const environment_set_path = process.env.ASSERTLY_DIRECTORY;
    let combined_path = null;


    if (!environment_set_path) {
      combined_path = componentDir
    } else if (path.isAbsolute(environment_set_path)) {
      combined_path = environment_set_path
    } else {
      combined_path = path.join(componentDir, environment_set_path)
    }
    // console.log(environment_set_path, componentDir, combined_path);
    const exists = await this.checkFilePath(combined_path);

    if (exists) {
      return combined_path;
    } else {
      return null;
    }
  }

  async checkFilePath(filePath) {
    try {
      await fs.promises.access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findWritePath(filePath, maxDepth, componentPath) {
    // exit recursion if directory does not exist
    // or root path is reached
    // or max recursion level reached

    // the ENV variable is checked before this method is run, if the ENV variable
    // points to a valid location, the envPath is used and this method is never invoked
    const filePathExists = await this.checkFilePath(filePath);

    if (!filePathExists || filePath === "/" || maxDepth < 0) {
      // console.log('exit condition reached')
      return componentPath;
    }

    const gitFile = path.join(filePath, ".git");
    const configFile = path.join(filePath, "jest.config.js");
    const gitExists = await this.checkFilePath(gitFile);
    const configExists = await this.checkFilePath(configFile);

    // check for the existence of the jest config file
    if (configExists) {
      // console.log('found jest config', filePath)
      const configs = require(configFile);

      // if it does exist, check if it has the rootDir key
      if (configs?.rootDir) {
        const jestLocation = path.join(filePath, configs?.rootDir);
        const jestLocationExists = await this.checkFilePath(jestLocation);
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
      return await this.findWritePath(
        path.dirname(filePath),
        maxDepth - 1,
        componentPath,
      );
    }
  }

  /* From a set of tests, get a unique list of components
    writeDir is not used in the current build, the findWritePathMethod uses a heuristic to find the relative write path
    based on whether an environmental variable exists or a jest config exists
   */
  async write(writeDir = null, input = null) {
    let component = {};
    let unitTests = [];
    let componentFileDir = "";
    let envPath = null;
    let wrapperType = 'shallow';

    // find the file path for the component
    if (input && input.length) {
      const payload = input[0];

      if (payload) {
        // component specific things are now in component info key
        const componentPath = payload.componentInfo?.filename;
        component = payload;

        envPath = await this.findEnvPath(path.dirname(componentPath));

        if (envPath) {
          componentFileDir = envPath
        } else {
          componentFileDir = await this.findWritePath(
            path.dirname(componentPath),
            this._maxRecurse,
            path.dirname(componentPath),
          );
        }
        if (componentFileDir.slice(-1) !== "/") componentFileDir = componentFileDir.concat("/");
      }
    }

    console.log('componentFileDir', componentFileDir);

    let testOutput = "";
    let componentImport = "";

    console.log('Event: \n', component)

    let clickTestBlock = '';
    if (component.clickHandlerComponent) {
      wrapperType = 'mount';

      const clickComponentName =
        component.clickHandlerComponent?.componentName;
      const clickProps = component.clickHandlerComponent?.props;
      const clickComponentPath = component.clickHandlerComponent?.filename;
      const isDefaultExport = component.componentInfo?.isDefaultExport;

      let clickRelativePath = path.relative(componentFileDir, clickComponentPath);
      clickRelativePath = path.join(path.parse(clickRelativePath).dir, path.parse(clickRelativePath).name);
      if (!clickRelativePath.includes('/')) clickRelativePath = "./" + clickRelativePath

      let clickComponentImport = '';
      if (isDefaultExport) {
        clickComponentImport = `import ${clickComponentName} from '${clickRelativePath}';`
      } else {
        clickComponentImport = `import {${clickComponentName}} from '${clickRelativePath}';`;
      }

      clickTestBlock = this.childClickTest(clickComponentName, clickProps)
    }

    testOutput += this.writeHead(wrapperType);

    // component specific things are now in component info key
    const componentName = component.componentInfo?.componentName;
    const props = component.componentInfo?.props;
    const isDefaultExport = component.componentInfo?.isDefaultExport;
    const componentPath = component.componentInfo?.filename;

    // grab only the relative filepath with filename but no extension
    let relativePath = path.relative(componentFileDir, componentPath);
    relativePath = path.join(path.parse(relativePath).dir, path.parse(relativePath).name)

    if (!relativePath.includes('/')) relativePath = "./" + relativePath

    if (isDefaultExport) {
      componentImport = `import ${componentName} from '${relativePath}';`;
    } else {
      componentImport = `import {${componentName}} from '${relativePath}';`;
    }

    testOutput += componentImport;
    if (clickComponentImport) {
      testOutput += clickComponentImport;
    }

    testOutput += '\n';

    testOutput += this.writeOuterDescribe(componentName);

    testOutput += this.writePropsAndWrapper(props, componentName, wrapperType);

    testOutput += this.basicRenderTest();

    testOutput += clickTestBlock;

    // close outer describe
    testOutput += this.closeBlock();

    //************************************************************//

    const prettyTestOutput = prettier.format(testOutput, {parser: "babel"});

    console.log(prettyTestOutput);
    // save the test outputs for a return if the user is not writing to a file
    unitTests.push(prettyTestOutput);

    const fileName = this.getTestFileName(componentPath);
    const writePath = path.join(componentFileDir, fileName);

    if (fs.existsSync(componentFileDir)) {
      // unlink the file in the specific directory if it already exists
      if (fs.existsSync(writePath)) {
        fs.unlinkSync(writePath);
      }

      // write the file
      await writeFileAsync(writePath, prettyTestOutput);
    } else {
      console.log(`Specified write directory ${componentFileDir} does not exist.`);
      return unitTests;
    }
  }

  writeHead(wrapperType) {
    return `
        import React from 'react';
        import { configure, ${wrapperType} } from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';
        configure({ adapter: new Adapter() });

      `;
  }

  writeSpy() {
    return `
    const spy = jest.spyOn(handlers, 'onClick');
    `;
  }

  writeOpenHandler() {
    return `
      const handlers = {
    `;
  }

  writeClickFunction(clickHandler) {
    return `
      onClick() ${clickHandler}
    `;
  }

  writeCloseCurly() {
    return `
    };
    `;
  }

  writeHandlerObject(handler) {
    return `
        ${handler?.handler}() {

    `;
  }

  writeOuterDescribe(describeName) {
    return `
      describe('${describeName}', () => {
    `;
  }

  closeBlock() {
    return `
      });
    `;
  }

  writeProps(props) {
    const propString = JSON.stringify(props);
    return `
      const props = ${propString};
    `;
  }

  writeClickProps(props) {
    delete props.onClick;
    const propString = JSON.stringify(props).replace(
      "}",
      ", onClick: () => handlers.onClick() }"
    );
    return `
      const props = ${propString};
    `;
  }

  writeWrapper(componentName, wrapperType) {
    return `
      const wrapper = ${wrapperType}(<${componentName} {...props} />);
    `;
  }

  writePropsAndWrapper(props, componentName, wrapperType) {
    return `
      ${this.writeProps(props)}
      
      ${this.writeWrapper(componentName, wrapperType)}
    `;
  }

  writeItBlock(itName) {
    return `
      it('${itName}', () => {
    `;
  }

  writeHandlerObject(clickHandler) {
    return `
      ${this.writeOpenHandler()}
      ${this.writeClickFunction(clickHandler)}
      ${this.writeCloseCurly()}
    `;
  }

  basicRenderTest() {
    return `
      ${this.writeItBlock("exists and is not null")}
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.getElement()).not.toBe(null);
      ${this.closeBlock()}
    `;
  }

  childClickTest(childComponentName, childComponentProps) {
    if (childComponentName) {

      let targetWrapperFind = `wrapper.find(${childComponentName})`;
      if (childComponentProps) {
        // filter just on primitives
        const strippedProps = this.stripObFunctionsFromProps(childComponentProps);
        targetWrapperFind = `${targetWrapperFind}.find(${JSON.stringify(strippedProps)})`;
      }

      return `
      ${this.writeItBlock("is successfully clicked")}
        const eventTargetWrapper = ${targetWrapperFind}.first();
        eventTargetWrapper.simulate("click");
        // assert outcome such as expect(spy).toHaveBeenCalled();
      ${this.closeBlock()}
      `;
    }

    return '';
  }

  stripObFunctionsFromProps(props) {
    let strippedProps = {};
    for (const prop of Object.keys(props)) {
      if (typeof props[prop] !== 'object' && props[prop] !== '[Function]') {
        strippedProps[prop] = props[prop];
      }
    }

    return strippedProps;
  }

  getPathArr(componentPath) {
    let pathArr = componentPath.split(/[\\\/]/);

    // remove empty leading ""
    pathArr.shift();

    return pathArr;
  }

  findAppBasePath(componentPath) {
    const pathArr = this.getPathArr(componentPath);
  }

  getTestFileName(componentPath) {
    const pathArr = this.getPathArr(componentPath);

    const originalFile = pathArr.pop();
    const extensionPattern = /\.[0-9a-z]+$/i;
    const extension = originalFile.match(extensionPattern)[0];

    let fileName = originalFile.replace(extension, `.spec${extension}`);

    // convert js -> jsx for now
    if (extension.charAt(extension.length - 1) !== "x") {
      fileName += "x";
    }

    return fileName;
  }
}
