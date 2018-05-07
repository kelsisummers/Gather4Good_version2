import React from "react";
import { Panel, Badge, Row, Col, Grid, FormControl, Button, Label } from 'react-bootstrap';
import Moment from 'react-moment';
import { Discussion } from "./Discussion/Discussion";
import moment from "moment";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import StateList from "./States.js";
import JoinBtn from "./JoinBtn.js";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from 'react-share';

export const Event = (props) => {
  const dateToFormat = props.data.dateTime;

  const editBtn = props.isOrganizer ? (
    <Button className='edit-btn' onClick={props.handleEditToggle}>{props.isEditingEvent ? `Cancel` : `Edit Event`}</Button>
  ) : null;

  const saveEditBtn = props.isEditingEvent ? (
    <Button className='edit-btn' style={{marginRight: "10px"}} onClick={props.handleEditSubmit}>Save Event Changes</Button>
  ) : null;

  return (

<section>
      <Col md={6} style={{marginRight: '5vw'}} className='daFuck'>
      <div>
        <Panel className="event z-depth-5">
          {/* Event Image */}
          <div className="image-container">
            {props.isEditingEvent ? (
              <FormControl
                style={{position: "absolute", width: "40%", backgroundColor: "rgba(255,255,255, 0.8)", color: "#1b1c1c", top:'10px', right:'10px', position: 'absolute'}}
                name="img_url"
                type="text"
                value={props.editData.img_url}
                placeholder="Image URL"
                onChange={props.handleEdit}/>
              ) : null}

            {props.data.img_url ? <img className="eventImage" src={props.data.img_url} /> : <img className="eventImage" src="../assets/wall-graffiti.jpg" />}

          {/* Event Title & Cause Badge */}
          {/* <Panel.Heading className="single-event-title" > */}
            <Row style={{marginBottom: '10px', marginLeft: '20px', marginRight:'20px', position: 'relative', bottom: '70px', zIndex: 2}}>
              {props.isEditingEvent ? (
                <Col>
                  <FormControl
                  style={{backgroundColor: "transparent", display: "inline-block", color: "#1b1c1c", fontSize: "30px", zIndex:100, border:"1px solid #ccc", marginLeft: 25, width: '90%' }}
                  name="title"
                  type="text"
                  value={props.editData.title}
                  placeholder="Event Title"
                  onChange={props.handleEdit}/>
                </Col>
              ) : (
                <Col xs={4} sm={4} md={8} style={{ color: 'white', position: 'absolute', zIndex: 2, fontSize: '30px'}} id='single-event-title'>
                {props.data.title}
                </Col>
              )}

              {props.isEditingEvent ? (
                <Col style={{zIndex: 4, position: 'relative'}}>
                  <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <select
                      style={{width: "auto", border: "1px solid #1b1c1c", cursor: "pointer", textAlign: 'center', paddingLeft:'20px', marginRight: '20px'}}
                      defaultValue={props.data.cause.name}
                      type="text"
                      name="cause"
                      placeholder="Cause Name"
                      onChange={props.handleEdit}
                    >
                      {props.causes.map(cause => (
                        <option
                          value={cause.name}
                          data-cause-id={cause._id}
                          key={cause._id}
                          >
                            {cause.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              ) : (
                <Col sm={3} md={3} style={{float:'right'}}>
                  <Badge style={{padding: '10px', borderRadius: 2, backgroundColor: '#00b9b4', fontSize: 14, color: 'white', float: 'right', zIndex: 3, position: 'relative'}}>
                  {props.data.cause.name}</Badge>
                </Col>
              )}
            </Row>
          {/* </Panel.Heading> */}
        </div>
        {/* Event Description */}
        <Panel.Body>
          <Row style={{padding:20}}>
            <Col md={12} style={{paddingTop: 10}}>
              <h4>
                {props.isEditingEvent ? (
                  <textarea
                    style={{border: "1px solid #ccc", padding: ".7em"}}
                    autoComplete="random"
                    rows="2"
                    name="description"
                    placeholder="Event description"
                    value={props.editData.description}
                    onChange={props.handleEdit}>
                  </textarea>
                ) : (
                  props.data.description
                )}
              </h4>
            </Col>

          {/* Date */}
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

            {/* Time */}
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

          {/* Location */}
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
                        <select
                          style={{ width: "auto", border: "1px solid #ccc", cursor: "pointer" }}
                          value={props.editData.location_state}
                          type="text"
                          name="location_state"
                          placeholder="State"
                          onChange={props.handleEdit}>
                          {StateList.map(state => (
                            <option
                              value={state}
                              key={state}>
                              {state}
                            </option>
                          ))}
                        </select>
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
        {/* Edit and Save Buttons */}
        <Row>
          <Col>
            <div style={{display: "flex", justifyContent: "flex-end", padding:"0px 10px"}}>
              {saveEditBtn}
              {editBtn}
            </div>
          </Col>
        </Row>
      </Panel.Body>
      <Panel.Footer style={{color:"#00b9b4", display: 'flex', alignItems: 'center'}}>

        <JoinBtn
                handleButtonClick={props.handleButtonClick}
                isOrganizer={props.isOrganizer}
                attending={props.attending} />
        <a className="controls"><span onClick={props.handleButtonClick} data-type="contact">Contact Organizer</span></a>

        <div style={{float: 'right', display: 'flex', alignItems: 'center', flexGrow: 8, justifyContent: 'flex-end'}}>
          <div style={{marginLeft:'5px'}} className="facebook-share">
            <FacebookShareButton
              url={props.shareUrl}
              quote={props.shareQuote}>
              <FacebookIcon size={28} round={true} />
            </FacebookShareButton>
          </div>
          <div style={{marginLeft:'5px'}} className="twitter-share">
            <TwitterShareButton
              url={props.shareUrl}
              quote={props.shareQuote}>
              <TwitterIcon size={28} round={true} />
            </TwitterShareButton>
          </div>
          <div style={{marginLeft:'5px'}} className="email-share">
            <EmailShareButton
              url={props.shareUrl}
              quote={props.shareQuote}>
              <EmailIcon size={28} round={true} />
            </EmailShareButton>
          </div>
        </div>

      </Panel.Footer>
    </Panel>
    </div>

  </Col>
  <div>
  <Col xs={10} sm={10} md={4} className="discussion" className='daFuck2'>
    <Discussion {...props}/>
  </Col>
  </div>
  </section>
  )
}
