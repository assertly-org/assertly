const {promisify} = require("util");
const fs = require("fs");
const path = require("path");

const writeFileAsync = promisify(fs.writeFile);

import prettier from "prettier";

export class jest {

  /* From a set of tests, get a unique list of components
    writeDir is not used in the current build, the findWritePathMethod uses a heuristic to find the relative write path
    based on whether an environmental variable exists or a jest config exists
   */
  async write(writeDir = null, input = null) {
    let component = {};
    let unitTests = [];
    let wrapperType = 'shallow';

    // for now, input is an array, set the payload to the first element in that array
    if (input && input.length) {
      component = input[0];
    } else {
      return {error: "No input to jest write method"}
    }

    const testWriteDir = component.checkedEvent?.testWriteDir;
    const testFileName = component.checkedEvent?.testFileName;
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
      const clickIsDefaultExport = component.componentInfo?.isDefaultExport;

      const clickRelativePath = this.getImportFromLocation(testWriteDir, clickComponentPath);
      
      let clickComponentImport = '';
      if (clickIsDefaultExport) {
        clickComponentImport = `import ${clickComponentName} from '${clickRelativePath}';`
      } else {
        clickComponentImport = `import {${clickComponentName}} from '${clickRelativePath}';`;
      }

      clickTestBlock = this.childClickTest(clickComponentName, clickProps)
    }

    testOutput += this.writeHead(wrapperType);

    const componentName = component.componentInfo?.componentName;
    const props = component.componentInfo?.props;
    const isDefaultExport = component.componentInfo?.isDefaultExport;
    const componentPath = component.componentInfo?.filename;
    const relativePath = this.getImportFromLocation(testWriteDir, componentPath);

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

  getImportFromLocation(writeDir, componentPath) {
    let relativePath = path.relative(writeDir, componentPath)
    relativePath = path.join(path.parse(relativePath).dir, path.parse(relativePath).name)
    if (!relativePath.includes('/')) relativePath = "./" + relativePath
    return relativePath
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

}
