import React from "react";
import { Panel, Badge, Row, Col, Grid, FormControl, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { DiscussionContainer } from "../single-event/";
import moment from "moment";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

export const Event = (props) => {
  const dateToFormat = props.data.dateTime;

  const joinBtn = !props.attending ? (
    <a className="controls"><span onClick={props.handleButtonClick} data-type="join">Join</span></a>
  ) : (
    <a className="controls"><span onClick={props.handleButtonClick} data-type="join">Unjoin</span></a>
  );

  const editBtn = props.isOrganizer ? <Button>{props.isEditingEvent ? `Close Edit` : `Edit Event`}</Button> : null;

  return (

    <div>
      <Grid>
      <Row>
      <Col md={8}>
      <Panel className="event z-depth-5">
        {/* Event Image */}
        <div className="image-container">
        {props.isEditingEvent ? (
              <FormControl
                style={{position: "absolute", width: "40%", backgroundColor: "transparent", color: "white"}}
                name="imgUrl"
                type="text"
                value={props.editData.imgUrl}
                placeholder="Image URL"
                onChange={props.handleEdit}/>
            ) : null}

        {props.data.img_url ? <img className="eventImage" src={props.data.img_url} /> : <img className="eventImage" src="../assets/wall-graffiti.jpg" />}
        <Panel.Heading className="eventTitle" style={{backgroundColor: "transparent", color: "#f7f7f7", fontSize: "30px", border: "none",zIndex:2 }}>

        {props.isEditingEvent ? (
              <FormControl
                style={{backgroundColor: "transparent", color: "#f7f7f7", fontSize: "30px", border: "none",zIndex:2 }}
                name="title"
                type="text"
                value={props.editData.title}
                placeholder="Event Title"
                onChange={props.handleEdit}/>
            ) : (
              <div style={{width: "70%", lineHeight: "1.1"}}>{props.data.title}</div>
            )}


          {props.isEditingEvent ? (
              <div style={{display: "flex", justifyContent: "flex-end"}}>
                <select
                  style={{width: "auto"}}
                  defaultValue={props.editData.cause.name}
                  type="text"
                  name="causeType"
                  placeholder="Event Name"
                  onChange={props.handleEdit}>
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
              ) : (
                <Badge style={{position:"absolute", bottom:20, right:"3vw", marginLeft:"50px"}}>{props.data.cause.name}</Badge>
              )}
        </Panel.Heading>
        </div>
        {/* Event Title */}
        <Panel.Body>
          <Row style={{padding:20}}>

            <Col md={12} style={{paddingTop: 10}}><h4>{props.data.description}</h4></Col>

          <Col xs={6}>

          <h4 className="header">Date:</h4>
            {props.isEditingEvent ? (
                  <SingleDatePicker
                    date={props.editData.date}
                    onDateChange={props.handleDateChange}
                    focused={props.focused}
                    onFocusChange={props.handleDateFocusChange}
                    numberOfMonths={1}
                  />
                  ) : (
                    <h4><Moment format="M/D/YYYY">{dateToFormat}</Moment></h4>
                  )}
          <h4 className="header">Time:</h4>
              {props.isEditingEvent ? (
                  <TimePicker
                    name="timepicker"
                    showSecond={false}
                    value={props.editData.time}
                    className="xxx"
                    onChange={props.handleTimeChange}
                    format={'h:mm a'}
                    use12Hours
                    inputReadOnly
                  />
                  ) : (
                    <h4><Moment format="h:mm a">{dateToFormat}</Moment></h4>
                  )}
          <h4 className="header">Attendees:</h4>
          <h4>{props.data.attendees.length}</h4>
          </Col>
          <Col xs={6}>

          <h4 className="header">Location:</h4>
          <h4>
            {props.isEditingEvent ? (
                        <FormControl
                        name="location_name"
                        type="text"
                        value={props.editData.location_name}
                        placeholder="Location Name"
                        onChange={props.handleEdit}/>

                      ) : (
                        `${props.data.location_name}`
                      )}
          </h4>
          <h4>
            {props.isEditingEvent ? (
                        <FormControl
                        name="location_street"
                        type="text"
                        value={props.editData.location_street}
                        placeholder="Street"
                        onChange={props.handleEdit}/>
                      ) : (
                        `${props.data.location_street}`
                      )}
          </h4>
          <h4>
            {props.isEditingEvent ? (
                          <FormControl
                          name="location_city"
                          type="text"
                          value={props.editData.location_city}
                          placeholder="City"
                          onChange={props.handleEdit}/>
                        ) : (
                          <span>{props.data.location_city}, </span>
                        )}
            {props.isEditingEvent ? (
                          <FormControl
                          name="location_state"
                          type="text"
                          value={props.editData.location_state}
                          placeholder="State"
                          onChange={props.handleEdit}/>
                        ) : (
                          <span>{props.data.location_state}</span>
                        )}
            {props.isEditingEvent ? (
                          <FormControl
                          name="location_zip"
                          type="text"
                          value={props.editData.location_zip}
                          placeholder="Zipcode"
                          onChange={props.handleEdit} />
                        ) : (
                          <div>{props.data.location_zip}</div>
                        )}
          </h4>
          </Col>
          </Row>

        </Panel.Body>
        <Panel.Footer style={{color:"#00b9b4"}}>

          {joinBtn}
          <a className="controls"><span onClick={props.handleButtonClick} data-type="share">Share</span></a>
          <a className="controls"><span onClick={props.handleButtonClick} data-type="contact">Contact Organizer</span></a>
          {editBtn}
        </Panel.Footer>
      </Panel>
      </Col>
      <Col sm={8} md={4} className="discussion">
      <DiscussionContainer {...props}/>
      </Col>
      </Row>
      </Grid>
    </div>
  )
}
