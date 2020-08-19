const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const writeFileAsync = promisify(fs.writeFile);

import prettier from "prettier";

export class jest {
  constructor() {
    this._maxRecurse = 10;
  }

  // findRelativePath(foundPath, componentPath, depth) {
  //   // escape hatch
  //   if (depth > this._maxRecurse) return;

  //   if (componentPath.includes(foundPath)) {
  //     // console.log("original: ", foundPath, depth)
  //     // console.log("stripped: ", componentPath.replace(foundPath, '../'.repeat(depth)))
  //     return componentPath.replace(foundPath, "../".repeat(depth));
  //   } else {
  //     // console.log(foundPath.replace(/[^\/]*\/$/, ""))
  //     return this.findRelativePath(
  //       foundPath.replace(/[^\/]*\/$/, ""),
  //       componentPath,
  //       depth + 1
  //     );
  //   }
  // }

  async findEnvPath(componentDir) {
    const environment_set_path = process.env.ASSERTLY_DIRECTORY;
    let combined_path = null;
    console.log(environment_set_path, componentDir);
    if(path.isAbsolute(environment_set_path)) {
      console.log('absolute')
      combined_path = environment_set_path
    } else {
      console.log('relative')
      combined_path = path.join(componentDir, environment_set_path)
    }
    const exists = await this.checkFilePath(combined_path);

    if (environment_set_path !== undefined && exists) {
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
    // or max recursion level reached\

    // console.log(`filepath: ${filePath}`)
    const filePathExists = await this.checkFilePath(filePath);

    if (!filePathExists || filePath === "/" || maxDepth < 0) {
      // console.log('exit condition reached')
      return componentPath;
    }

    const gitFile = path.join(filePath, ".git");
    const configFile = path.join(filePath, "jest.config.js");
    const gitExists = await this.checkFilePath(gitFile);
    const configExists = await this.checkFilePath(configFile);

    if (configExists) {
      // console.log('jest config found')
      const configs = require(configFile);

      if (configs?.rootDir) {
        const jestLocation = path.join(filePath, configs?.rootDir);
        const jestLocationExists = await this.checkFilePath(jestLocation);
        if (jestLocationExists) {
          // console.log('jest location exists', jestLocation)
          return jestLocation;
        } else {
          // console.log(`jest rootDir location didn't exist`)
          return componentPath;
        }
      } else {
        return componentPath;
      }
    } else if (gitExists) {
      // console.log("git file reached");
      return componentPath;
    } else {
      return await this.findWritePath(
        path.dirname(filePath),
        maxDepth - 1,
        componentPath,
      );
    }
  }

  async write(writeDir = null, input = null) {
    console.log(`writing jest test to ${writeDir} for input: \n`, input);

    /*
     From a set of tests, get a unique list of components
     */
    let componentMap = {};
    let unitTests = [];
    let foundPath = "";
    let envPath = null;

    for (let actionCounter = 0; actionCounter < input.length; actionCounter++) {
      const payload = input[actionCounter];

      if (payload) {
        // component specific things are now in component info key
        const componentPath = payload.componentInfo?.filename;
        componentMap[componentPath] = payload;

        envPath = await this.findEnvPath(path.dirname(componentPath));

        if (envPath) {
          foundPath = envPath
        } else {
          foundPath = await this.findWritePath(
            path.dirname(componentPath),
            this._maxRecurse,
            path.dirname(componentPath),
          );
        }
        if (foundPath.slice(-1) !== "/") foundPath = foundPath.concat("/");

        console.log("found path found: ", envPath, foundPath);
      }
    }

    for (const componentKey of Object.keys(componentMap)) {
      const component = componentMap[componentKey];
      let testOutput = "";
      let componentImport = "";

      testOutput += this.writeHead();

      // write the test for the component that caused the click, by mounting and clicking
      if (component.clickHandlerComponent) {
        const clickComponentName =
          component.clickHandlerComponent?.componentName;
        const clickProps = component.clickHandlerComponent?.props;
        const clickComponentPath = component.clickHandlerComponent?.filename;
        const clickRelativePath = path.relative(foundPath, clickComponentPath) 
        const clickHandler = "{return true}";

        componentImport = `import ${clickComponentName} from '${clickRelativePath}';`;
        testOutput = componentImport + testOutput;

        testOutput += this.writeHandlerObject(clickHandler);

        testOutput += this.writeOuterDescribe(clickComponentName);
        testOutput += this.writeSpy();
        testOutput += this.writeClickPropsAndShallowWrapper(
          clickProps,
          clickComponentName
        );

        testOutput += this.basicClickTest();
        testOutput += this.basicRenderTest();

        // close outer describe
        testOutput += this.closeBlock();
      }

      // write the tests for the component(s), do not include the component that caused the click; that test is included seperately
      if (
        component.componentInfo?.componentName !==
        component.clickHandlerComponent?.componentName
      ) {
        // component specific things are now in component info key
        const componentName = component.componentInfo?.componentName;
        const props = component.componentInfo?.props;
        const componentPath = componentKey;
        const relativePath = path.relative(foundPath, componentPath);

        componentImport = `import ${componentName} from '${relativePath}';`;
        testOutput = componentImport + testOutput;

        testOutput += this.writeOuterDescribe(componentName);

        testOutput += this.writePropsAndShallowWrapper(props, componentName);

        testOutput += this.basicRenderTest();

        // close outer describe
        testOutput += this.closeBlock();
      }

      //************************************************************//

      const prettyTestOutput = prettier.format(testOutput, { parser: "babel" });

      console.log(prettyTestOutput);
      // save the test outputs for a return if the user is not writing to a file
      unitTests.push(prettyTestOutput);

      const fileName = this.getTestFileName(componentPath);
      const writePath = path.join(foundPath, fileName);

      if (fs.existsSync(foundPath)) {
        // unlink the file in the specific directory if it already exists
        if (fs.existsSync(writePath)) {
          fs.unlinkSync(writePath);
        }

        // write the file
        await writeFileAsync(writePath, prettyTestOutput);
      } else {
        console.log(`Specified write directory ${foundPath} does not eixst.`);
        return unitTests;
      }
    }
  }

  writeHead() {
    return `
        import React from 'react';
        import { configure, shallow } from 'enzyme';
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

  writeShallowWrapper(componentName) {
    return `
      const wrapper = shallow(<${componentName} {...props} />);
    `;
  }

  writePropsAndShallowWrapper(props, componentName) {
    return `
      ${this.writeProps(props)}
      
      ${this.writeShallowWrapper(componentName)}
    `;
  }

  writeClickPropsAndShallowWrapper(props, componentName) {
    return `
      ${this.writeClickProps(props)}
      
      ${this.writeShallowWrapper(componentName)}
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

  basicClickTest() {
    return `
      wrapper.simulate('click');
      ${this.writeItBlock("is successfully clicked")}
        expect(spy).toHaveBeenCalled();
      ${this.closeBlock()}
  `;
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
