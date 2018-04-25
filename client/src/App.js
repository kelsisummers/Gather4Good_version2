import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent";

class App extends Component {
  render() {
    return (
      <CreateEvent />
    );
  }
}

export default App;
