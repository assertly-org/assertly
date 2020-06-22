import React from "react";

import FormikBasic from "./FormikBasic";
import FormikAsyncAutoPop from "./FormikAsyncAutoPop";

import "./Styles.css";

export default class Form extends React.PureComponent {
  componentDidMount() {
    document.title = "Form";
  }

  render() {
    return (
      <>
        <h1>Form Components</h1>
        <FormikBasic />
        <FormikAsyncAutoPop />
      </>
    );
  }
}
