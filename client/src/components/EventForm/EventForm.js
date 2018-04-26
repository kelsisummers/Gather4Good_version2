import React, {Component} from "react";
import "./EventForm.css";
import moment from "moment";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
// import DateTimePicker from 'react-datetime-picker';
import * as Datetime from 'react-datetime';

class EventForm extends Component {

  state = {
    date: moment(),
    eventTime: moment(),
    focused: false,
    format: 'h:mm a',
    now: moment().hour(0).minute(0)
  };

  onTimeChange = (value) => {
    console.log(value && value.format('h:mm a'));
    this.setState({eventTime: value}, () => {
      console.log("eventime state");
      console.log(this.state.eventTime);
    });
  }

  onDateChange = (event) => {
    console.log(event)
  }

  onChange = date => this.setState({ date })

  render() {
    console.log(this.state.date);

      return (
      <div className="component-wrapper">
        <div className="form-head">
          <h2>Create an Event</h2>
        </div>
        <div className="form-container">
          <form>

            <h3>Step 1: Tell Us About Your Event </h3>
            <div className="form-step-wrapper">
  						<input
                type="text"
                name="eventName"
                placeholder="Event Name"
              />
              <textarea
                rows="2"
                name="eventDescription"
                placeholder="Description of your event">
              </textarea>
					  </div>

          <h3>{`Step 2: What's Your Event's Cause?`}</h3>
          <div className="form-step-wrapper">
            <select
              defaultValue="Choose Your Cause"
              type="text"
              name="causeType"
              placeholder="Event Name">
                <option value="" disabled={true} hidden={true}> Choose Your Cause</option>
                <option value="Gender Equality">Gender Equality</option>
                <option value="LGBTQ">LGBTQ</option>
                <option value="Environment">Environment</option>
                <option value="Racial Equality">Racial Equality</option>
                <option value="Animal Rights">Animal Rights</option>
                <option value="Education">Education</option>
                <option value="Human Rights">Human Rights</option>
                <option value="Public Health">Public Health</option>
                <option value="Economic Equality ">Economic Equality</option>
            </select>
          </div>

          <h3>Step 3: Upload An Image (Optional)</h3>
          <div className="form-step-wrapper">
            <input
              type="text"
              name="imgUrl"
              placeholder="Image URL"
            />
          </div>

          <h3>Step 4: Event Date and Time</h3>
          <div id="date-time-wrapper" className="form-step-wrapper">

            <Datetime />;


              <SingleDatePicker
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={date => {console.log(date); this.setState({ date })}} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                numberOfMonths={1}
              />

              <TimePicker
                showSecond={false}
                value={this.state.eventTime}
                className="xxx"
                onChange={this.onTimeChange}
                format={'h:mm a'}
                use12Hours
                inputReadOnly
              />

          </div>

          <h3>Step 5: Event Location</h3>
            <div id="date-time-wrapper" className="form-step-wrapper">
            <div className="form-step-wrapper">
              <input
                type="text"
                name="streetAdress"
                placeholder="Street Address"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
              />
              <select
                defaultValue="State"
                type="text"
                name="state"
                placeholder="State">
                  <option value="State" disabled={true} hidden={true}>State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AR">Arizona</option>
              </select>
              <input
                type="text"
                name="zipcode"
                placeholder="Zipcode"
              />
            </div>

          </div>

          </form>
        </div>
      </div>
    );
  }
}

export default EventForm;
