import React, {Component} from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import EventForm from "../../components/EventForm"
import moment from "moment";
import StateList from "./States";
import Auth from "../../utils/Auth.js";
import API from "../../utils/API.js";
import "./CreateEvent.css";


class CreateEvent extends Component {

  state = {
    date: moment(),
    time: moment(),
    focused: false,
    causeType: "",
    causeId: "",
    eventName: "",
    imgUrl: "",
    eventDescription: "",
    locationName: "",
    streetAddress: "",
    city: "",
    USstate: "",
    zipcode: "",
    causes: [],
    open: false,
    newEventId: ""
  };


  loadCauses = () => {
    API.getCauses()
      .then(res => {
        console.log("Results returned when requesting causes")
        console.log(res.data);
        this.setState({causes: res.data});
      })
      .catch(err => console.log(err))
  }


  componentDidMount = () => {
    console.log("*****COMPONENT DID MOUNT FOR EVENT PAGE CALLED*****");
    this.loadCauses();
  }

  handleCollapse = () => {
    this.setState({ open: !this.state.open }, () => {
      console.log("Testing button click");
      console.log(this.state.open);
    });
  }


  handleInputChange = (event) =>  {
    const { name, value } = event.target;

    this.setState({[name]: value});

    if(name === "causeType") {
      const option = event.target.options[event.target.selectedIndex];
      const causeId = option.attributes.getNamedItem("data-cause-id").value;

      this.setState({causeId: causeId}, () => {
        console.log("Update CauseId State:");
        console.log(this.state.causeId);
      });
    }
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

    //Following three lines of function are only for testing purposes
    //To confirm the ISO date is being properly generated
    const mom_date = moment(ISO_DATE_TIME);
    const formattedDate = mom_date.format("ddd, DD MMM YYYY h:mm:ss a");
    console.log(formattedDate);

    //Return value
    return ISO_DATE_TIME;
  }

  submitEventToDb = () =>  {
    const ISO_DATE_TIME = this.createDateTimeStr();
    const {eventName, eventDescription, imgUrl, locationName} = {...this.state};
    const {streetAddress, city, USstate, zipcode, causeId} = {...this.state};

    const eventData = {
      title: eventName,
      dateTime: ISO_DATE_TIME,
      description: eventDescription,
      img_url: imgUrl,
      location_name: locationName,
      location_street: streetAddress,
      location_city: city,
      location_state: USstate,
      location_zip: zipcode,
      cause: causeId,
      organizer_id: this.props.authData.user_id
    }

    console.log(eventData);

    return API.createEvent(eventData)
      .then(res => {
        console.log("Result returned when generating new event")
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
        return Promise.reject(err);
      })
  }


    handleFormSubmit = (event) =>  {
      event.preventDefault();

      if(Auth.isTokenNullOrExpired()) {
        this.props.authFunctions.clearAuthAndShowModal("createEvent");
      } else {
        this.submitEventToDb()
          .then(data => {
            console.log("New Event:")
            console.log(data.data._id);
            this.props.history.push({
              pathname: `/event/${data.data._id}`
            })
          })
          .catch(error => {
            this.props.authFunctions.clearAuthAndShowModal("createEvent");
            console.log(error);
          })
      }
    }

  render() {
      return (
        <Grid fluid className="background">
          <Row>
            <Col md={3} />
            <Col xs={12} md={6}>
              <EventForm className="event-form" {...this.state}
                stateList={StateList}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                handleDateChange={this.handleDateChange}
                handleDateFocusChange={this.handleDateFocusChange}
                handleTimeChange={this.handleTimeChange} />
            </Col>
            <Col md={3} />
          </Row>
        </Grid>
    );
  }
}

export default CreateEvent;
