const {promisify} = require("util");
const fs = require("fs");
const path = require("path");

const writeFileAsync = promisify(fs.writeFile);

import prettier from "prettier";

export class jest {

  // writeDir is not used in the current build, the findWritePathMethod uses a hueristic to find the relative write path
  // based on whether an environmental variable exists or a jest config exists
  async write(writeDir = null, input = null) {

    /*
     From a set of tests, get a unique list of components
     */
    let componentMap = {};
    let unitTests = [];

    for (let actionCounter = 0; actionCounter < input.length; actionCounter++) {
      const payload = input[actionCounter];

      if (payload) {
        // component specific things are now in component info key
        const componentPath = payload.componentInfo?.filename;
        componentMap[componentPath] = payload;
      }
    }

    for (const componentKey of Object.keys(componentMap)) {
      const component = componentMap[componentKey];
      const testWriteDir = component.testWriteDir;
      const testFileName = component.testFileName;
      let testOutput = "";
      let componentImport = "";

      console.log('Event: \n', component)

      testOutput += this.writeHead();

      // write the test for the component that caused the click, by mounting and clicking
      if (component.clickHandlerComponent) {

        const clickComponentName = component.clickHandlerComponent?.componentName;
        const clickProps = component.clickHandlerComponent?.props;
        const clickComponentPath = component.clickHandlerComponent?.filename;
        const clickHandler = "{return true}";
        const clickIsDefaultExport = component.componentInfo?.isDefaultExport;

        const clickRelativePath = this.getImportFromLocation(testWriteDir, clickComponentPath);

        clickIsDefaultExport ? componentImport = `import ${clickComponentName} from '${clickRelativePath}';` :
          componentImport = `import {${clickComponentName}} from '${clickRelativePath}';`;

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
      // if they are the same component, only the click version will be created
      if (
        component.componentInfo?.componentName !==
        component.clickHandlerComponent?.componentName
      ) {
        // component specific things are now in component info key
        const componentName = component.componentInfo?.componentName;
        const props = component.componentInfo?.props;
        const isDefaultExport = component.componentInfo?.isDefaultExport;
        const componentPath = componentKey;

        // grab only the relative filepath with filename but no extension

        const relativePath = this.getImportFromLocation(testWriteDir, componentPath);

        // add curly parens if it is not the default export
        isDefaultExport ? componentImport = `import ${componentName} from '${relativePath}';` :
          componentImport = `import {${componentName}} from '${relativePath}';`;

        testOutput = componentImport + testOutput;

        testOutput += this.writeOuterDescribe(componentName);

        testOutput += this.writePropsAndShallowWrapper(props, componentName);

        testOutput += this.basicRenderTest();

        // close outer describe
        testOutput += this.closeBlock();
      }

      //************************************************************//

      const prettyTestOutput = prettier.format(testOutput, {parser: "babel"});

      console.log(prettyTestOutput);
      // save the test outputs for a return if the user is not writing to a file
      unitTests.push(prettyTestOutput);

      const writePath = path.join(testWriteDir, testFileName);

      if (fs.existsSync(testWriteDir)) {
        // unlink the file in the specific directory if it already exists
        if (fs.existsSync(writePath)) {
          fs.unlinkSync(writePath);
        }
        // write the file
        await writeFileAsync(writePath, prettyTestOutput);
      } else {
        console.log(`Specified write directory ${testWriteDir} does not eixst.`);
        return unitTests;
      }
    }
  }

  getImportFromLocation(writeDir, componentPath) {
    let relativePath = path.relative(writeDir, componentPath)
    relativePath = path.join(path.parse(relativePath).dir, path.parse(relativePath).name)
    if (!relativePath.includes('/')) relativePath = "./" + relativePath
    return relativePath
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

}
