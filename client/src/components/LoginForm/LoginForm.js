import React, {Component} from "react";
import "./LoginForm.css";
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class LoginForm extends Component {

  state = {
    loginEmail: "",
    loginPassword: ""
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    console.log(name)
    console.log(value)
    this.setState({[name]: value});
  }

  render() {
    return (
      <Form horizontal style={{marginTop: "20px"}}>
        <FormGroup controlId="formHorizontalLoginEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              name="loginEmail"
              type="email"
              value={this.state.loginEmail}
              placeholder="Email"
              onChange={this.handleChange}
              required="required" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLoginPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              name="loginPassword"
              type="password"
              value={this.state.loginPassword}
              placeholder="Password"
              onChange={this.handleChange}
              required="required"
              title="This field is required"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

}

export default LoginForm;
