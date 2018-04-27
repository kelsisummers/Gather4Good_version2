import React, {Component} from "react";
import "./RegForm.css";
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

class RegForm extends Component {

  state = {
    regFirstName: "",
    regLastName: "",
    regEmail: "",
    regPassword: ""
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
        <FormGroup controlId="formHorizontalFirstNameInput">
          <Col componentClass={ControlLabel} sm={2}>
            First Name
          </Col>
          <Col sm={10}>
            <FormControl
              name="regFirstName"
              type="text"
              value={this.state.regFirstName}
              placeholder="First Name"
              onChange={this.handleChange}
              required="required" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLastNameInput">
          <Col componentClass={ControlLabel} sm={2}>
            Last Name
          </Col>
          <Col sm={10}>
            <FormControl
              name="regLastName"
              type="text"
              value={this.state.regLastName}
              placeholder="Last Name"
              onChange={this.handleChange}
              required="required" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              name="regEmail"
              type="email"
              value={this.state.regEmail}
              placeholder="Email"
              onChange={this.handleChange}
              required="required" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              name="regPassword"
              type="password"
              value={this.state.regPassword}
              placeholder="Password"
              onChange={this.handleChange}
              required="required" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Register</Button>
          </Col>
        </FormGroup>

      </Form>
    );
  }

}

export default RegForm;
