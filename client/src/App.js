import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEvent from "./pages/CreateEvent/CreateEvent.js";
import SingleEvent from "./pages/SingleEvent/SingleEvent.js";
import Home from "./pages/Home/Container.js";
import Footer from "./components/Footer";
import MainNav from "./components/MainNav";
import AuthModal from "./components/AuthModal";
import Auth from "./utils/Auth";
// import "./App.css";

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
    modalTriggerType: "",
  }

  componentDidMount = () => {
    console.log("Implement check auth status method here");

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

  handleRegSubmit = (event) => {
    event.preventDefault();
    console.log("handle Reg submit called");

    const userData = {
      name: `${this.state.regFirstName} ${this.state.regLastName}`,
      email: this.state.regEmail,
      password: this.state.regPassword

    }

    const regStatus = Auth.submitRegistration(userData);

    if(regStatus) {
      console.log("registration successful")
    } else {
      console.log("something went wrong with registration")
    }

  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log("handle login submit called");

    const credentials = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }

    const loginStatus = Auth.submitLogin(credentials);

    if(loginStatus) {
      console.log("login successful");
    } else {
      console.log("something went wrong with login");
    }

  }

  render() {
    return (
      <div>
      <MainNav
      // {...this.state}
      //     handleInputChange={this.handleInputChange}
      //     handleModalShow={this.handleModalShow}
      //     handleModalClose={this.handleModalClose}
      //     handleTabSelect={this.handleTabSelect}
      />
      <AuthModal {...this.state}
          handleInputChange={this.handleInputChange}
          handleModalShow={this.handleModalShow}
          handleModalClose={this.handleModalClose}
          handleTabSelect={this.handleTabSelect}
          handleRegSubmit={this.handleRegSubmit}
          handleLoginSubmit={this.handleLoginSubmit}
      />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={CreateEvent} />
          <Route path="/event" component={SingleEvent} />
        </Switch>
      </Router>
      <Footer />
      </div>
    );
  }
}

export default App;
