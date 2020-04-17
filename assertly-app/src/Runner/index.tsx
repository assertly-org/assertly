import React, { Component } from 'react';
import './Runner.scss';
import {isJson} from './utils';


class Runner extends Component {
  componentDidMount(): void {
    window.addEventListener("message", this.receiveMessage);
  }

  receiveMessage(event: any) {      
    let data = event.data;
    if (event && event.data && typeof event.data === 'string' && isJson(data)) {
      data = JSON.parse(data);
    }
  }

  render() {
    return (
      <div className="runner">        
        <div className="size-container">
          <iframe id="runner-iframe" className="iframe" name="runner" src="//localhost:3000" />
          </div>        
      </div>
    );
  }
}

export default Runner;