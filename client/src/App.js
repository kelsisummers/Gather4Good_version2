import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent/CreateEvent.js";
import AuthModal from "./components/AuthModal";
import Container from "./pages/SingleEvent/Container.js";
import Home from "./pages/Home";

class App extends Component {

  // -- Add to state: userId (str), maybe user's name, authError(bool), authErrorType(str)
  // -- Set activeModalKey state based on modalTriggerType (loginBtnClick, RegBtnClick, createEvent, JoinEvent)
  // -- Methods - checkTokenOnLogin (call inside ComponentWillMount and set loggedIn based on this)
  // -- handleLogin, handleReg - each will modify authenication state and possibly set authError/authErrorType (wrong password, existing email)

  state = {
    loginEmail: "",
    loginPassword: "",
    regFirstName: "",
    regLastName: "",
    regEmail: "",
    regPassword: "",
    activeModalKey: 1,
    showModal: false,
    modalTriggerType: ""
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    console.log(name)
    console.log(value)
    this.setState(({[name]: value}), () => {
      console.log("In callback");
      console.log("Name: " + name);
      console.log("Value: " + value);
    });
  }

  handleModalClose = () =>  {
    this.setState(({ showModal: false,
                     activeModalKey: 1,
                     loginEmail: "",
                     loginPassword: "",
                     regFirstName: "",
                     regLastName: "",
                     regEmail: "",
                     regPassword: ""}), () => {
        console.log("Updated state for showmodal in callback")
        console.log(this.state.showModal)
    });
  }

  handleModalShow = () => {
    this.setState(({ showModal: true }), () => {
        console.log("Updated state for showmodal in callback")
        console.log(this.state.showModal)
    });
  }

  handleTabSelect = (key) => {
    console.log(key);
    console.log(`selected ${key}`);
    this.setState({ activeModalKey: key }, () => {
      console.log("Updated state for key in callback")
      console.log(this.state.activeModalKey)
    });
  }

  render() {
    return (
      <Router>
        <div style={{height: "100%"}}>
            <h1> G4G Nav </h1>
            <AuthModal {...this.state}
                      handleInputChange={this.handleInputChange}
                      handleModalShow={this.handleModalShow}
                      handleModalClose={this.handleModalClose}
                      handleTabSelect={this.handleTabSelect}/>
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
