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

    const componentPropFilename = component.checkedEvent?.componentPropFilename;

    let testOutput = '';

    let componentImport = '';
    let componentPropsImport = '';

    let clickTestBlock = '';
    let clickComponentImport = '';
    let clickComponentPropsImport = '';

    console.log('Event: \n', component)
    
    
    if (component.clickHandlerComponent) {
      wrapperType = 'mount';

      const clickComponentName = component.clickHandlerComponent?.componentName;
      const clickProps = component.clickHandlerComponent?.props;   
      const clickComponentPath = component.clickHandlerComponent?.filename;
      const clickIsDefaultExport = component.clickHandlerComponent?.isDefaultExport;
      
      const clickGetPropsFromFile = component.clickHandlerComponent?.getPropsFromFile;

      const clickRelativePath = this.getImportFromLocation(testWriteDir, clickComponentPath);  

      if (clickIsDefaultExport) {
        clickComponentImport = `import ${clickComponentName} from '${clickRelativePath}';`;
      } else {
        clickComponentImport = `import {${clickComponentName}} from '${clickRelativePath}';`;
      }

      if (clickGetPropsFromFile) {
        // assumption that the prop files will be in the same directory as the test file
        clickComponentPropsImport += `import {clickHandlerProps} from './${componentPropFilename}';`;
      }

      clickTestBlock = this.childClickTest(clickComponentName, clickProps, clickGetPropsFromFile)
    }

    testOutput += this.writeHead(wrapperType);

    const componentName = component.componentInfo?.componentName;

    const props = component.componentInfo?.props;
    
    const isDefaultExport = component.componentInfo?.isDefaultExport;
    const componentPath = component.componentInfo?.filename;
    const getPropsFromFile = component.componentInfo?.getPropsFromFile;

    const relativePath = this.getImportFromLocation(testWriteDir, componentPath);


    if (isDefaultExport) {
      componentImport = `import ${componentName} from '${relativePath}';`;
    } else {
      componentImport = `import {${componentName}} from '${relativePath}';`;
    }
    if (getPropsFromFile) {
      // assumption that the prop files will be in the same directory as the test file
      componentPropsImport += `import {componentProps} from './${componentPropFilename}';`;
    }

    testOutput += componentImport;
    testOutput += componentPropsImport;
    testOutput += clickComponentPropsImport;

    // only add click import if the component names are different
    if (clickComponentImport && componentName !== clickComponentName) {
      testOutput += clickComponentImport;
    }

    testOutput += '\n';

    testOutput += this.writeOuterDescribe(componentName);

    testOutput += this.writePropsAndWrapper(props, componentName, wrapperType, getPropsFromFile);

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

  writeProps(props, getPropsFromFile = false) {
    if (!getPropsFromFile) {
      const strippedProps = this.stripObFunctionsFromProps(props);
      const propString = JSON.stringify(strippedProps);
      return `
        const props = ${propString};
      `;
    } else {
      return `
        const props = {...componentProps};
      `;
    }
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

  writePropsAndWrapper(props, componentName, wrapperType, getPropsFromFile = false) {
    return `
      ${this.writeProps(props, getPropsFromFile)}
      
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

  childClickTest(childComponentName, childComponentProps, getPropsFromFile = false) {
    if (childComponentName) {

      let targetWrapperFind = `wrapper.find(${childComponentName})`;
      if (childComponentProps) {
        // filter just on primitives
        if (!getPropsFromFile) {
          const strippedProps = this.stripObFunctionsFromProps(childComponentProps);
          targetWrapperFind = `${targetWrapperFind}.find(${JSON.stringify(strippedProps)})`;
        } else {
          targetWrapperFind = `${targetWrapperFind}.find({...clickHandlerProps})`;
        }
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
