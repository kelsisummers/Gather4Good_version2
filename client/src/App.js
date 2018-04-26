import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{height: "100%"}}>
            <h1> G4G Nav </h1>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={CreateEvent} />
            </Switch>
            <h1> Footer </h1>
        </div>
      </Router>
    );
  }
}

export default App;
