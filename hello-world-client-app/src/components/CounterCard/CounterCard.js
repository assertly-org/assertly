
import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

export default class CounterCard extends Component {
  constructor(props) {
    super(props);
    this.state = { counter:0};

  }

  componentDidMount() {
    document.title = "CounterCard";
  }

  addHandler = () => {
    const count = this.state.counter
    this.setState({
      counter: count + 1
    })
  }

  subtractHandler = () => {
    const count = this.state.counter
    this.setState({
      counter: count - 1
    })
  }

  render() {
    return (
      <>
        <h1>Counter Card</h1>

        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Counter Card</Card.Title>
            <Card.Text>
              This is the count {this.state.counter}
            </Card.Text>
            <ButtonToolbar style={{justifyContent: 'center'}}>
              <Button variant="primary" size='lg' onClick = {this.addHandler}>Add</Button>
              <Button variant="secondary" size='lg' onClick = {this.subtractHandler}>Subtract</Button>
              
            </ButtonToolbar>  
            <div onClick = {this.addHandler}>Add in a div</div> 
            <div onClick = {this.subtractHandler}>Subtract in a div</div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
