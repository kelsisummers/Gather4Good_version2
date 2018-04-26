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


  handleInputChange = (event) =>  {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }


  handleDateChange = (date) => {
    console.log(date._d);

    this.setState({date}, () => {
      console.log(this.state.date);
    });
  }


  handleDateFocusChange = ({focused}) =>  {
    console.log(focused);

    this.setState({focused: focused}, () => {
      console.log(this.state.focused);
    });
  }


  handleTimeChange = (value) => {
    console.log(value && value.format('h:mm a'));

    this.setState({time: value}, () => {
      console.log("Time state:");
      console.log(this.state.time);
    });
  }


  createDateTimeStr = () => {
    const dateStr = this.state.date._d.toDateString();
    const timeStr = this.state.time._d.toTimeString();
    console.log(typeof this.state.date._d)
    const new_date = `${dateStr} ${timeStr}`;
    console.log(new_date);
    const log_date = new Date(new_date);
    console.log(log_date);
    const ISO_DATE_TIME = new Date(new_date).toISOString();
    console.log("dateStr: " + dateStr);
    console.log("timeStr: " + timeStr);
    console.log(ISO_DATE_TIME);

    //Rest of function for testing purposes
    const mom_date = moment(ISO_DATE_TIME);
    const formattedDate = mom_date.format("ddd, DD MMM YYYY h:mm:ss a");
    console.log(formattedDate);
  }


  handleFormSubmit = (event) =>  {
    console.log("hello world");

    //Implement form submission logic here
    this.createDateTimeStr();
  }


  render() {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <EventForm {...this.state}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                handleDateChange={this.handleDateChange}
                handleDateFocusChange={this.handleDateFocusChange}
                handleTimeChange={this.handleTimeChange} />
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default CreateEvent;
