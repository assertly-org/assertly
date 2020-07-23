const {promisify} = require('util');
const fs = require('fs');
const writeFileAsync = promisify(fs.writeFile);
import prettier from 'prettier';

export class jest {

  async write(writeDir=null, input=null) {
    console.log(`writing jest test to ${writeDir} for input: \n`, input)
    
    /*
     From a set of tests, get a unique list of components
     */
    let componentMap = {};
    let unitTests = [];

    


    for (let actionCounter = 0; actionCounter < input.length; actionCounter++) {
      const payload = input[actionCounter];

      if (payload) {
        // component specific things are now in component info key
        const componentPath = payload.componentInfo[0]?.filename;
        componentMap[componentPath] = payload;
      }
    }


    for (const componentKey of Object.keys(componentMap)) {
      const component = componentMap[componentKey];

      // component specific things are now in component info key
      const componentName = component.componentInfo[0]?.componentName;
      const props = component.componentInfo[0]?.props;
      const componentPath = componentKey;
      
      // const clickHandler = componentInfo[0]?.clickHandler?.function?.substring(componentInfo[0]?.clickHandler?.function?.indexOf('{')+1) || null

      let testOutput = '';
      let componentImport = `import ${componentName} from '${componentPath}';`;
      testOutput += this.writeHead(componentImport);

      testOutput += this.writeOuterDescribe(componentName);

      testOutput += this.writePropsAndShallowWrapper(props, componentName);

      testOutput += this.basicRenderTest();

      // close outer describe
      testOutput += this.closeBlock();

      const prettyTestOutput = prettier.format(testOutput, {parser: 'babel'});

      console.log('this is the pretty test output', prettyTestOutput)
      // save the test outputs for a return if the user is not writing to a file
      unitTests.push(prettyTestOutput)

      const fileName = this.getTestFileName(componentPath);

      const writePath = writeDir + fileName;

      // write the pretty test output to the path only if a writeDir was passed in
      if(writeDir) {
        if (fs.existsSync(writePath)) {
          fs.unlinkSync(writePath);
        }

        await writeFileAsync(writePath, prettyTestOutput);
      }
    }

    if (!writeDir) {
      // if there is no write directory return the componentMap, which has the Jest unit tests attached to it
      return unitTests;
    }
  }

  writeHead(componentImport) {
    return `
        import React from 'react';
        import { configure, shallow } from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';
        
        ${componentImport}
        
        configure({ adapter: new Adapter() });
      `;
  }

  writeOpenHandler() {
    return `
      const handlers = {
    `
  }

  writeTwoCloseCurly() {
    return `
    }};
    `

  }

  writeHandlerObject(handler) {
    return `
        ${handler?.handler}() {

    `
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

  writeItBlock(itName) {
    return `
      it('${itName}', () => {
    `;
  }

  basicRenderTest() {
    return `
      ${this.writeItBlock('exists and is not null')}
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.getElement()).not.toBe(null);
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
    if (extension.charAt(extension.length - 1) !== 'x') {
      fileName += 'x';
    }

    return fileName;
  }
}
