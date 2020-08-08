const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const writeFileAsync = promisify(fs.writeFile);


import prettier from 'prettier';

export class jest {
  constructor() {

    this._maxRecurse = 10;


  }

  findEnvPath() {
    const environment_set_path = process.env.ASSERTLY_DIRECTORY

    if (environment_set_path !== undefined && fs.existsSync(environment_set_path)) {
      return environment_set_path
    } else {
      return null
    }
  }

  findWritePath(filePath, maxDepth, componentPath) { 

    // exist recursion if directory does not exist 
    // or root path is reached 
    // or max recursion level reached

    if (!fs.existsSync(filePath) || filePath === '/' || maxDepth < 0){
      return this.findEnvPath() ? this.findEnvPath() : componenthPath
    }

    const gitFile = path.join(filePath, '.git')
    const configFile = path.join(filePath,'jest.config.js')
    const gitExists = fs.existsSync(gitFile)
    const configExists = fs.existsSync(configFile)

    if(configExists) {
      console.log('jest config found', this)
      const configs = require(configFile)

      if(configs?.rootDir) {
        const jestLocation = path.join(filePath, configs?.rootDir)
        if(fs.existsSync(jestLocation)) return jestLocation
      } else {
        
        return this.findEnvPath() ? this.findEnvPath() : componenthPath
      }

    } else if (gitExists){
      console.log("git file reached");
      return this.findEnvPath() ? this.findEnvPath() : componenthPath

    } else {
      this.findWritePath(path.dirname(filePath), maxDepth-1, componentPath)
    }
  
  }

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
        const componentPath = payload.componentInfo?.filename;
        componentMap[componentPath] = payload;

        this.findWritePath(path.dirname(componentPath), 10, path.dirname(componentPath));
        // if null is returned (no jest config and not default passed in via cli ), 
        // place test in origianl component folder
      }
    }

    

    
    for (const componentKey of Object.keys(componentMap)) {
      const component = componentMap[componentKey];
      let testOutput = '';
      let componentImport = ''

      testOutput += this.writeHead();

      // write the test for the component that caused the click, by mounting and clicking
      if(component.clickHandlerComponent) {

        const clickComponentName = component.clickHandlerComponent?.componentName;
        const clickProps = component.clickHandlerComponent?.props;
        const clickComponentPath = component.clickHandlerComponent?.filename;
        const clickHandler = '{return true}'

        componentImport = `import ${clickComponentName} from '${clickComponentPath}';`;
        testOutput = componentImport + testOutput;

        testOutput += this.writeHandlerObject(clickHandler)

        testOutput += this.writeOuterDescribe(clickComponentName);
        testOutput += this.writeSpy();
        testOutput += this.writeClickPropsAndShallowWrapper(clickProps, clickComponentName);
        
        testOutput += this.basicClickTest();
        testOutput += this.basicRenderTest();
  
        // close outer describe
        testOutput += this.closeBlock();

      }

      // write the tests for the component(s), do not include the component that caused the click; that test is included seperately
      if(component.componentInfo?.componentName !== component.clickHandlerComponent?.componentName) {
        // component specific things are now in component info key
        const componentName = component.componentInfo?.componentName;
        const props = component.componentInfo?.props;
        const componentPath = componentKey;
        // 
        componentImport = `import ${componentName} from '${componentPath}';`;
        testOutput = componentImport + testOutput;

        testOutput += this.writeOuterDescribe(componentName);

        testOutput += this.writePropsAndShallowWrapper(props, componentName);

        testOutput += this.basicRenderTest();

        // close outer describe
        testOutput += this.closeBlock();
      }

      //************************************************************//

      const prettyTestOutput = prettier.format(testOutput, {parser: 'babel'});

      console.log(prettyTestOutput)
      // save the test outputs for a return if the user is not writing to a file
      unitTests.push(prettyTestOutput)

      const fileName = this.getTestFileName(componentPath);

      const writePath = writeDir + fileName;

      // write the pretty test output to the path only if a writeDir was passed in
      if(writeDir) {
        if (fs.existsSync(writePath)) {
          fs.unlinkSync(writePath);
        }

        if (fs.existsSync(writeDir)) {
          await writeFileAsync(writePath, prettyTestOutput);
        } else {
          console.log(`Specified write directory ${writeDir} does not eixst.`)
          return
        }
       
      }
    }

    if (!writeDir) {
      // if there is no write directory return the componentMap, which has the Jest unit tests attached to it
      return unitTests;
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
    `
  }

  writeOpenHandler() {
    return `
      const handlers = {
    `
  }

  writeClickFunction(clickHandler) {
    return `
      onClick() ${clickHandler}
    `
  }

  writeCloseCurly() {
    return `
    };
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

  writeClickProps(props) {
    delete props.onClick;
    const propString = JSON.stringify(props).replace("}", ", onClick: () => handlers.onClick() }");
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
    `
  }

  basicRenderTest() {
    return `
      ${this.writeItBlock('exists and is not null')}
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.getElement()).not.toBe(null);
      ${this.closeBlock()}
    `;
  }

  basicClickTest() {
    return `
      wrapper.simulate('click');
      ${this.writeItBlock('is successfully clicked')}
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
    if (extension.charAt(extension.length - 1) !== 'x') {
      fileName += 'x';
    }

    return fileName;
  }
}
