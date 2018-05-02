import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEvent from "./pages/CreateEvent/CreateEvent.js";
import SingleEvent from "./pages/SingleEvent/SingleEvent.js";
import Home from "./pages/Home/Home.js";
import Footer from "./components/Footer";
import MainNav from "./components/MainNav";
import AuthModal from "./components/AuthModal";
import Auth from "./utils/Auth";
import AuthNav from "./components/AuthNav";
// import "./App.css";

class App extends Component {

  state = {
    // Whether user is logged in
    isAuthenicated: false,

    // Data for an authenticated user. Access this state when you need to create
    // an event, etc. or want to display user-specific data
    user_id: "",
    user_name: "",
    user_email: "",

    // Tracks input for auth modal reg and login forms. Use for login/reg submission.
    loginEmail: "",
    loginPassword: "",
    regFirstName: "",
    regLastName: "",
    regEmail: "",
    regPassword: "",

    // Tracks modal tab displayed or to be displayed (1 = Login; 2 = Register)
    activeModalKey: 1,
    // Whether modal is displayed. State can be altered based on login/reg btn clicks, hitting protected
    //endpoints, user manual closing, or proper authentication (dismisses modal)
    showModal: false,
    // What triggered auth modal to display - needed to determine correct tab
    // and correct CTA displays
    modalTriggerType: "",

    //Tracks the state of whether there was an error on reg or login attempt.
    //E.g., - user already exists, wrong password, no user found. Needed to
    // correct error message
    auth_error: "",
  }


  componentDidMount = () => {
    console.log("*****COMPONENT DID MOUNT FOR APP.JS CALLED*****");

    if(Auth.isTokenNullOrExpired()) {
      this.clearAuthData();
    } else {
      Auth.verifyToken()
        .then(data => {
          this.setAuthData(data);
        })
        .catch(error => {
          this.clearAuthData();
          console.log(error);
        })
    }
  }


  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value, auth_error: ""});
  }


  handleModalClose = () =>  {
    this.setState({ showModal: false,
      activeModalKey: 1,
      loginEmail: "",
      loginPassword: "",
      regFirstName: "",
      regLastName: "",
      regEmail: "",
      regPassword: "",
      auth_error: "",
      modalTriggerType: "" });
  }


  handleModalShow = (modalTriggerType) => {
    this.setState({modalTriggerType: modalTriggerType})

    if(modalTriggerType === "regBtnClick") {
      this.setState({activeModalKey: 2}, () => {
        this.setState({ showModal: true });
      })
    } else {
      this.setState({ showModal: true });
    }

  }


  handleTabSelect = (key) => {
    this.setState({ activeModalKey: key });
  }


  setAuthData = (data) => {
    this.setState({isAuthenicated: true,
      user_id: data._id,
      user_email: data.email,
      user_name: data.name,}, () => {
        this.handleModalClose();
      })
  }


  clearAuthData = () => {
    console.log("clear auth called");
    this.setState({ isAuthenicated: false,
      user_id: "",
      user_email: "",
      user_name: "" })
  }


  clearAuthAndShowModal = (modalTriggerType) => {
    this.clearAuthData();
    this.handleModalShow(modalTriggerType);
  }


  handleLoginSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }

    Auth.submitLogin(credentials)
      .then(data => {
        //Confirm user authenicated
        if(data.auth === true) {
          this.setAuthData(data);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        this.setState({auth_error: error.message})
        this.clearAuthData();
      })
  }


  handleRegSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: `${this.state.regFirstName} ${this.state.regLastName}`,
      email: this.state.regEmail,
      password: this.state.regPassword
    }

    Auth.submitRegistration(userData)
      .then(data => {
        //Confirm user authenticated
        if(data.auth === true) {
          this.setAuthData(data);
        }
      })
      .catch((error) => {
        this.setState({auth_error: error.message});
        this.clearAuthData();
      })
  }


  handleLogout = () =>  {
    localStorage.removeItem("token");
    this.clearAuthData();
  }


  render() {

    const authData = {
      isAuthenicated: this.state.isAuthenicated,
      user_id: this.state.user_id,
      user_name: this.state.user_name,
      user_email: this.state.user_email
    }

    const authFunctions = {
      clearAuthData: this.clearAuthData,
      handleModalShow: this.handleModalShow,
      clearAuthAndShowModal: this.clearAuthAndShowModal
    }

    return (
      <div>
        {this.state.isAuthenicated ? <AuthNav handleLogout={this.handleLogout}/> : <MainNav handleModalShow={this.handleModalShow}/>}
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
            <Route exact path="/" render={(props) => <Home {...props} authData={authData} />}/>
            <Route exact path="/create" render={(props) => <CreateEvent {...props} authData={authData} authFunctions={authFunctions} />} />
            <Route path="/event" render={(props) => <SingleEvent {...props} authData={authData} />} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
