import React, { Component } from 'react';
import Button from "react-bootstrap/Button";

export default class WrapperButton extends Component {

  render() {
    return (
     <Button {...this.props}/>
    );
  }
}