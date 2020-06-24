<div align="center"> 
  
  <img src="https://user-images.githubusercontent.com/50563470/81960314-c2b2d680-95de-11ea-868b-13706ef634ca.png" alt="assertly logo" width="250">

  <!-- ![image](https://user-images.githubusercontent.com/50563470/81960314-c2b2d680-95de-11ea-868b-13706ef634ca.png | width = 100) -->

  ![Build Status](https://travis-ci.com/assertly-org/assertly.svg?token=Vax8msRzpGHP7UCKR1YC&branch=master)
  ![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)
  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
  [![npm version](https://badge.fury.io/js/%40assertly-org%2Fassertly-oss.svg)](https://badge.fury.io/js/%40assertly-org%2Fassertly-oss)
</div>

# assertly

Assertly is an automated unit test generation tool which creates jest tests of React components.

## Getting Started

The Assertly app repo is divided in three portions, api, client, and the react component. 

Clone the repo, then install and and start the API by typing "npm install" then "npm run start" in the api directory. By default, this will start an express server in port 3002 which will write the unit tests as well as serve the client to the Assertly component in your React app. If a different port is preferred, you may set a system variable of ASSERTLY_PORT to use instead of the default.  

The component to drop into your app is in the react directory. Import this component and place it at the head of your React app. No props are necessary to pass to the Assertly component. The purpose of the component is to execute an immediately invoked function expression which retrieves the client code from the running server. 

No action is needed in the client directory; it contains the javascript that the api is serving to the Assertly component.

When generated, tests will be placed in the assertly_generated_tests sub-directory of the api directory.

## Requirements

Assertly uses the current stable release of node. Please ensure your node environment is configured appropriately. 

## Example Application

For your convenience, an example application called "hello-world-client-app" is available for use. This example app uses react-scripts in the package.json. "npm install" then "npm run start" will launch the application on port 3000 in localhost. Note that the Assertly component has been inserted in App.js in the src sub-directory.

# Copyright & License

Copyright (c) 2020 Assertly Foundation - Released under the [GNU license](LICENSE). Assertly and the Assertly Logo are trademarks of Assertly Foundation. 
