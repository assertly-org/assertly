
import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import WrapperButton from './WrapperButton'

export default class CounterCard extends Component {
  constructor(props) {
    super(props);
    this.state = { counterOne:0, counterTwo:0};

  }

  componentDidMount() {
    document.title = "CounterCard";
  }

  addHandler = (cardNum = 1) => {
    if (cardNum === 1) this.setState({counterOne: this.state.counterOne + 1})
    if (cardNum === 2) this.setState({counterTwo: this.state.counterTwo + 1})
  }

  subtractHandler = (cardNum = 1) => {
    if (cardNum === 1) this.setState({counterOne: this.state.counterOne - 1})
    if (cardNum === 2) this.setState({counterTwo: this.state.counterTwo - 1})
  }

  render() {
    return (
      <>
        <h1>Counter Card</h1>

        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Counter Card</Card.Title>
            <Card.Text>
              This is the count {this.state.counterOne}
            </Card.Text>
            <ButtonToolbar style={{justifyContent: 'center'}}>
              <Button variant="primary" size='lg' onClick = {() => this.addHandler(1)}>Add</Button>
              <Button variant="secondary" size='lg' onClick = {() => this.subtractHandler(1)}>Subtract</Button>
              
            </ButtonToolbar>  
            <div onClick = {() => this.addHandler(1)}>Add in a div</div> 
            <div onClick = {() => this.subtractHandler(1)}>Subtract in a div</div>
          </Card.Body>
        </Card>
        <br/>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Counter Card With Wrapped Component</Card.Title>
            <Card.Text>
              This is the count {this.state.counterTwo}
            </Card.Text>
            <ButtonToolbar style={{justifyContent: 'center'}}>
              <WrapperButton variant="primary" size='lg' onClick = {() => this.addHandler(2)}>Add</WrapperButton>
              <WrapperButton variant="secondary" size='lg' onClick = {() => this.addHandler(2)}>Subtract</WrapperButton>
              
            </ButtonToolbar>  
            <div onClick = {() => this.addHandler(2)}>Add in a div</div> 
            <div onClick = {() => this.subtractHandler(2)}>Subtract in a div</div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
