import React, {Component} from "react";
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

const RegForm = (props) => {
    return (
      <Form horizontal style={{marginTop: "20px"}} onSubmit={props.handleRegSubmit}>
        <FormGroup controlId="formHorizontalFirstNameInput">
          <Col componentClass={ControlLabel} sm={3} style={{fontWeight: 'normal', fontSize: 18}}>
            First Name
          </Col>
          <Col sm={9}>
            <FormControl
              name="regFirstName"
              type="text"
              value={props.regFirstName}
              placeholder="First Name"
              onChange={props.handleInputChange}
              required="required"
              pattern=".*\S+.*" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLastNameInput">
          <Col componentClass={ControlLabel} sm={3} style={{fontWeight: 'normal', fontSize: 18}}>
            Last Name
          </Col>
          <Col sm={9}>
            <FormControl
              name="regLastName"
              type="text"
              value={props.regLastName}
              placeholder="Last Name"
              onChange={props.handleInputChange}
              required="required"
              pattern=".*\S+.*" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={3} style={{fontWeight: 'normal', fontSize: 18}}>
            Email
          </Col>
          <Col sm={9}>
            <FormControl
              name="regEmail"
              type="email"
              value={props.regEmail}
              placeholder="Email"
              onChange={props.handleInputChange}
              required="required"
              pattern=".*\S+.*" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={3} style={{fontWeight: 'normal', fontSize: 18}}>
            Password
          </Col>
          <Col sm={9}>
            <FormControl
              name="regPassword"
              type="password"
              value={props.regPassword}
              placeholder="Password"
              onChange={props.handleInputChange}
              required="required"
              pattern=".*\S+.*" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={3} sm={9} style={{fontSize: 16}}>
            <Button type="submit">Register</Button>
          </Col>
        </FormGroup>

      </Form>
    );
}


export default RegForm;
