import React, {Component} from "react";
import "./EventForm.css";
import moment from "moment";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import * as Datetime from 'react-datetime';

class EventForm extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="component-wrapper">
        <div className="form-head">
          <h2>Create an Event</h2>
        </div>
        <div className="form-container">
          <form autoComplete="random">

            <h3>Step 1: Tell Us About Your Event </h3>
            <div className="form-step-wrapper">
  						<input
                autoComplete="random"
                type="text"
                name="eventName"
                placeholder="Event Name"
                value={this.props.eventName}
                onChange={this.props.handleInputChange}
              />
              <textarea
                autoComplete="random"
                rows="2"
                name="eventDescription"
                placeholder="Description of your event"
                value={this.props.eventDescription}
                onChange={this.props.handleInputChange}>
              </textarea>
  				  </div>

            <h3>{`Step 2: What's Your Event's Cause?`}</h3>
            <div className="form-step-wrapper">
              <select
                defaultValue="Choose Your Cause"
                type="text"
                name="causeType"
                placeholder="Event Name"
                onChange={this.props.handleInputChange}>

                  <option data-cause-id="" key="default" value="Choose Your Cause" disabled={true} hidden={true}> Choose Your Cause</option>
                  {this.props.causes.map(cause => (
                    <option
                      value={cause.name}
                      data-cause-id={cause._id}
                      key={cause._id}>
                      {cause.name}
                    </option>
                  ))}

              </select>
            </div>

            <h3>Step 3: Upload An Image (Optional)</h3>
            <div className="form-step-wrapper">
              <input
                type="text"
                name="imgUrl"
                placeholder="Image URL"
                value={this.props.imgUrl}
                onChange={this.props.handleInputChange}
              />
            </div>

            <h3>Step 4: Event Date and Time</h3>
            <div id="date-time-wrapper" className="form-step-wrapper">
              <SingleDatePicker
                date={this.props.date}
                onDateChange={this.props.handleDateChange}
                focused={this.props.focused}
                onFocusChange={this.props.handleDateFocusChange}
                numberOfMonths={1}
              />
              <TimePicker
                name="timepicker"
                showSecond={false}
                value={this.props.time}
                className="xxx"
                onChange={this.props.handleTimeChange}
                format={'h:mm a'}
                use12Hours
                inputReadOnly
              />
            </div>

            <h3>Step 5: Event Location</h3>
              <div className="form-step-wrapper">
                <input
                  autoComplete="random"
                  type="text"
                  name="locationName"
                  placeholder="Location Name"
                  value={this.props.locationName}
                  onChange={this.props.handleInputChange}
                />
                <input
                  autoComplete="random"
                  type="text"
                  name="streetAddress"
                  placeholder="Street Address"
                  value={this.props.streetAddress}
                  onChange={this.props.handleInputChange}
                />
                <input
                  autoComplete="random"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={this.props.city}
                  onChange={this.props.handleInputChange}
                />
                <input
                  autoComplete="random"
                  name="USstate"
                  list="USstates"
                  type="text"
                  placeholder="Select a state"
                  id="USstate"
                  value={this.props.USstate}
                  onChange={this.props.handleInputChange}
                />
                <datalist id="USstates">
                  {this.props.stateList.map(state => (
                    <option value={state} key={state} />
                  ))}
                </datalist>
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode"
                  value={this.props.zipcode}
                  onChange={this.props.handleInputChange}
                />
              </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={this.props.handleFormSubmit}>
                Create Event
            </button>

          </form>
        </div>
      </div>
    );
  }
}

export default EventForm;