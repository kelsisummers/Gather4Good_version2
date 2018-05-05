import React, {Component} from "react";
import moment from "moment";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import * as Datetime from 'react-datetime';
import { Grid, Row, Col, Button, Panel, Glyphicon, PanelGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

const EventForm = (props) => {
    return (
      <div className="component-wrapper">
        <div className="form-head">
          <h2>Create an Event</h2>
        </div>
        <div className="form-container">
          <form autoComplete="random" onSubmit={props.handleFormSubmit}>

            <PanelGroup accordion >
            <Panel eventKey='1'>
              <Panel.Heading>
                <Panel.Title toggle>
                  <h3><Glyphicon glyph="star" className="glyphicon"/>Tell Us About Your Event</h3>
                </Panel.Title>
              </Panel.Heading>
                <Panel.Body collapsible>
                  <div className="form-step-wrapper">
        						<input
                      autoComplete="random"
                      name="eventName"
                      placeholder="Event Name"
                      value={props.eventName}
                      onChange={props.handleInputChange}
                    />
                    <textarea
                      autoComplete="random"
                      rows="2"
                      name="eventDescription"
                      placeholder="Description of your event"
                      value={props.eventDescription}
                      onChange={props.handleInputChange}>
                    </textarea>
        				  </div>
                </Panel.Body>
                </Panel>
            

            <Panel eventKey='2'>
              <Panel.Heading>
                <Panel.Title toggle>
                  <h3><Glyphicon glyph="heart" className="glyphicon"/>What Cause Does Your Event Support?</h3>
                </Panel.Title>
              </Panel.Heading>
                <Panel.Body collapsible>
                  <div className="form-step-wrapper">
    {/* <DropdownButton 
      defaultValue="Choose Your Cause"
      name='causeType'
      type='text'
      placeholder='Event Cause'
      onChange={props.handleInputChange}
    >
      {props.causes.map(cause => {
          return 
            <MenuItem
              value={cause.name}
              data-cause-id={cause._id}
              key={cause._id}
            >
              {cause.name}
              </MenuItem>
      })
                        
    </DropdownButton> */}
                    <select
                      defaultValue="Choose Your Cause"
                      type="text"
                      name="causeType"
                      placeholder="Event Name"
                      onChange={props.handleInputChange}>

                        <option data-cause-id="" key="default" value="Choose Your Cause" disabled={true} hidden={true}>Choose Your Cause</option>
                        {props.causes.map(cause => (
                          <option
                            value={cause.name}
                            data-cause-id={cause._id}
                            key={cause._id}>
                            {cause.name}
                          </option>
                        ))}

                    </select>
                  </div>
                </Panel.Body>
            </Panel>

            <Panel eventKey='3'>
              <Panel.Heading>
                <Panel.Title toggle>
                  <h3><Glyphicon glyph="picture" className="glyphicon"/>Add an Image</h3>
                </Panel.Title>
              </Panel.Heading>
                <Panel.Body collapsible>
                  <div className="form-step-wrapper">
                    <input
                      type="text"
                      name="imgUrl"
                      placeholder="Image URL"
                      value={props.imgUrl}
                      onChange={props.handleInputChange}
                    />
                  </div>
                </Panel.Body>
            </Panel>

            <Panel eventKey='4'>
              <Panel.Heading>
                <Panel.Title toggle>
                  <h3><Glyphicon glyph="calendar" className="glyphicon"/>Event Date and Time</h3>
                </Panel.Title>
              </Panel.Heading>
                <Panel.Body collapsible>
                  <div id="date-time-wrapper" className="form-step-wrapper">
                    <SingleDatePicker
                      date={props.date}
                      onDateChange={props.handleDateChange}
                      focused={props.focused}
                      onFocusChange={props.handleDateFocusChange}
                      numberOfMonths={1}
                    />
                    <TimePicker
                      name="timepicker"
                      showSecond={false}
                      value={props.time}
                      className="xxx"
                      onChange={props.handleTimeChange}
                      format={'h:mm a'}
                      use12Hours
                      inputReadOnly
                    />
                  </div>
                </Panel.Body>
            </Panel>

            <Panel eventKey='5'>
              <Panel.Heading>
                <Panel.Title toggle>
                  <h3><Glyphicon glyph="map-marker" className="glyphicon"/>Event Location</h3>
                </Panel.Title>
              </Panel.Heading>
                <Panel.Body collapsible>
                  <div className="form-step-wrapper">
                    <input
                      autoComplete="random"
                      type="text"
                      name="locationName"
                      placeholder="Location Name"
                      value={props.locationName}
                      onChange={props.handleInputChange}
                    />
                    <input
                      autoComplete="random"
                      type="text"
                      name="streetAddress"
                      placeholder="Street Address"
                      value={props.streetAddress}
                      onChange={props.handleInputChange}
                    />
                    <input
                      autoComplete="random"
                      type="text"
                      name="city"
                      placeholder="City"
                      value={props.city}
                      onChange={props.handleInputChange}
                    />
                    <input
                      autoComplete="random"
                      name="USstate"
                      list="USstates"
                      type="text"
                      placeholder="Select a state"
                      id="USstate"
                      value={props.USstate}
                      onChange={props.handleInputChange}
                    />
                    <datalist id="USstates">
                      {props.stateList.map(state => (
                        <option value={state} key={state} />
                      ))}
                    </datalist>
                    <input
                      type="text"
                      name="zipcode"
                      placeholder="Zipcode"
                      value={props.zipcode}
                      onChange={props.handleInputChange}
                    />
                  </div>
                </Panel.Body>
            </Panel>
            </PanelGroup>


            <button
              type="submit"
              className="btn btn-success">
                Create Event
            </button>


          </form>
        </div>
      </div>
    );
}

export default EventForm;
