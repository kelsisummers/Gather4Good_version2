import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent";
import TestPage from "./pages/TestPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{height: "100%"}}>
            <h1> G4G </h1>
            <Switch>
              <Route exact path="/" component={TestPage} />
              <Route exact path="/create" component={CreateEvent} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
