import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import CreateEvent from "./pages/CreateEvent";
import TestPage from "./pages/TestPage";
=======
import SingleEventPage from "./pages/SingleEventPage/SingleEventPage.js";
>>>>>>> fd84e53e0a01438e719fba0575b672eb5d5dd2ec

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
<<<<<<< HEAD
      </Router>
=======
        <p className="App-intro"></p>
        <SingleEventPage />
      </div>
>>>>>>> fd84e53e0a01438e719fba0575b672eb5d5dd2ec
    );
  }
}

export default App;
