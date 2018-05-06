import React, {Component} from "react";
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

const LoginForm = (props) => {
    return (
      <Form horizontal style={{marginTop: "20px"}} onSubmit={props.handleLoginSubmit}>
        <FormGroup controlId="formHorizontalLoginEmail">
          <Col componentClass={ControlLabel} sm={2} style={{fontWeight: 'normal', fontSize: 18}}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              name="loginEmail"
              type="email"
              value={props.loginEmail}
              placeholder="Email"
              onChange={props.handleInputChange}
              required="required"
              pattern=".*\S+.*" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLoginPassword">
          <Col componentClass={ControlLabel} sm={2} style={{fontWeight: 'normal', fontSize: 18}}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              name="loginPassword"
              type="password"
              value={props.loginPassword}
              placeholder="Password"
              onChange={props.handleInputChange}
              required="required"
              title="This field is required"
              pattern=".*\S+.*"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" style={{fontWeight: 'normal', fontSize: 16}}>Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    );
}

export default LoginForm;
