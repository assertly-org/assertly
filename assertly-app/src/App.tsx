import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Window from './Types';
import { ThemeProvider } from '@material-ui/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import './App.css';
import TestEditor from './TestEditor'


class App extends Component<any> {
  render() {
    return (
      <div className="App">    
        <Provider store={this.props.store} key="provider">
          <ConnectedRouter history={this.props.history}>
            <Switch>              
              <Route path="/" exact component={TestEditor} />
            </Switch>          
          </ConnectedRouter>  
        </Provider>
      </div>
    );
  }
}

export default App;
