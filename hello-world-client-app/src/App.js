import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Form from "./components/Form/Form";
import DesignPatterns from "./components/DesignPatterns/DesignPatterns";
import CounterCard from "./components/CounterCard/CounterCard";



import Assertly from "./components/ThirdPartyWrappers/Assertly";

const customHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Assertly />

        <Router history={customHistory}>
          <Navigation />
          <Container>
            <Switch>
              <Route path="/" exact component={Form} />
              <Route path="/designpatterns" exact component={DesignPatterns} />
              <Route path="/countercard" exact component={CounterCard} />
            </Switch>
          </Container>
        </Router>
      </div>
    );
  }
}

window.addEventListener("popstate", () => {
  console.log("iframe popstate");
});

window.addEventListener("replaceState", () => {
  console.log("iframe pushState");
});

export default App;
