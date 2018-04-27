import React, {Component} from "react";
import "./RegForm.css";
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

class RegForm extends Component {

  state = {
    value: ""
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <form style={{marginTop: "20px"}}>
        <FormGroup controlId="formBasicText" >
          <ControlLabel>Name</ControlLabel>
          <FormControl
            name="first_name"
            type="text"
            value={this.state.value}
            placeholder="Enter Name"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>

        <FormGroup>
          <Col>
            <Button type="submit">Register</Button>
          </Col>
        </FormGroup>
      </form>
    );
  }

}

export default RegForm;
