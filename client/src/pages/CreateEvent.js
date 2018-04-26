import React, {Component} from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import EventForm from "../components/EventForm"
import moment from "moment";

class CreateEvent extends Component {

  state = {
    date: moment(),
    time: moment(),
    focused: false,
    causeType: "",
    eventName: "",
    imgUrl: "",
    eventDescription: "",
    streetAddress: "",
    city: "",
    USstate: "",
    zipcode: ""
  };

  handleTimeChange = (value) => {
    console.log(value && value.format('h:mm a'));
    this.setState({time: value}, () => {
      console.log("Time state");
      console.log(this.state.time);
    });
  }

  handleInputChange = (event) =>  {
    const { name, value } = event.target;
    console.log("Name: " + name);
    console.log("Value: " + value);

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = (event) =>  {
    console.log( )
  }

  render() {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <EventForm {...this.state} handleFormSubmit={this.handleFormSubmit} />
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default CreateEvent;
