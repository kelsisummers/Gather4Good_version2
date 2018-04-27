import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent/CreateEvent.js";
import AuthModal from "./components/AuthModal";
import Container from "./pages/SingleEvent/Container.js";
import Home from "./pages/Home";

class App extends Component {

  // -- STATE - loggedIn (bool), showModal (bool), modalTriggerType (str)
  // -- userId (str), maybe user's name (str)
  // -- signInValidationErr(bool), signInValidationErrType(str)
  // -- authError(bool), authErrorType(str)
  //
  // -- Set active key in modal based on modalTriggerType (loginBtnClick, RegBtnClick, createEvent, JoinEvent)
  // -- Make sure to reset modal related state properties on modal close
  // -- Methods - checkTokenOnLogin (call inside ComponentWillMount and set loggedIn based on this)
  // -- handleLogin, handleReg - each will modify auth state and possibly set authError/authErrorType (wrong password, existing email, blank spaces)


  render() {
    return (
      <Router>
        <div style={{height: "100%"}}>
            <h1> G4G Nav </h1>
            <AuthModal activeKey={1}/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={CreateEvent} />
              <Route path="/event" component={Container} />
            </Switch>
            <h1> Footer </h1>
        </div>
      </Router>
    );
  }
}

export default App;
