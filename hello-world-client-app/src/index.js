import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import watchState from './linkFiber';

ReactDOM.render(<App />, document.getElementById('root'));

// watchState(document.getElementById('root'));


// (function(w,d,s,l,i){
//   w[l]=w[l]||[];
//   w[l].push({
//     'assertly.start': new Date().getTime(),
//     event:'assertly.js','apiKey':i
//   });
  
//   var f=d.getElementsByTagName(s)[0],   // this grabs the enclosing script element
//       j=d.createElement(s),             // this creates another script element called 'j'
//       dl = l != 'dataLayer' ? '&l='+l:'';

//   j.async=true;
//   j.src='//localhost:3006/client/lib/assertly.js?id='+i+dl;
//   f.parentNode.insertBefore(j,f);      // this inserts the created script before the the script that runs this iife
// })
// (window,document,'script','dataLayer','${apiKey}')

// // w is the window
// // d is the document
// // s is the script (just a string)
// // l is the datalayer (just a string)
// // i is the api key with the template literal