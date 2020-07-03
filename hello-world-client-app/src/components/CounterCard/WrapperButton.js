
import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

export default class WrapperButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <Button {...this.props}/>
    );
  }
}