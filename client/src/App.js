import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEvent from "./pages/CreateEvent/CreateEvent.js";
import SingleEvent from "./pages/SingleEvent/SingleEvent.js";
import Home from "./pages/Home/Home.js";
import Footer from "./components/Footer";
import MainNav from "./components/MainNav";
import AuthModal from "./components/AuthModal";
import Auth from "./utils/Auth";
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

  // Check authenication status on componentDidMount for App.js and
  // each page load
  handleAuthStatus = () => {
    Auth.determineAuthStatus()
      .then(data => {
        //Confirm auth status
        if(data.auth === true) {
          this.setAuthData(data);
        } else  {
          this.clearAuthData();
        }
      })
      .catch((error) => {
        this.clearAuthData();
      })
  }


  componentDidMount = () => {
    this.handleAuthStatus();
  }


  handleInputChange = (event) => {
    const {name, value} = event.target;
    console.log(name)
    console.log(value)
    this.setState(({[name]: value, auth_error: ""}), () => {
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
                     regPassword: "",
                     auth_error: "",
                     modalTriggerType: ""}), () => {
        console.log(this.state.showModal)
    });
  }


  handleModalShow = (modalTriggerType) => {
    //this.setState({modalTriggerType: modalTriggerType})
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


  setAuthData = (data) => {
    this.setState({isAuthenicated: true,
      user_id: data._id,
      user_email: data.email,
      user_name: data.name,}, () => {
        console.log("State after successful login")
        console.log(this.state);
        this.handleModalClose();
      })
  }


  clearAuthData = (data) => {
    this.setState({isAuthenicated: false,
      user_id: "",
      user_email: "",
      user_name: ""}, () => {
        console.log(this.state);
      })
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
