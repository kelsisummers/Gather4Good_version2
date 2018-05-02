import React from "react";
import { Panel, Badge, Row, Col, Grid } from 'react-bootstrap';
import Moment from 'react-moment';
import { DiscussionContainer } from "../single-event/";

export const Event = (props) => {
const dateToFormat = props.data.dateTime;

  return (
    
    <div>
      <Grid>
      <Row>
      <Col md={8}>
      <Panel className="event z-depth-5">
        {/* Event Image */}
        <div className="image-container">
        {props.data.img_url ? <img className="eventImage" src={props.data.img_url} /> : <img className="eventImage" src="../assets/wall-graffiti.jpg" />} 
        <Panel.Heading className="eventTitle" style={{backgroundColor: "transparent", color: "#f7f7f7", fontSize: "30px", border: "none",zIndex:2 }}>{props.data.title}
        <Badge style={{position:"absolute", bottom:20, right:"3vw", marginLeft:"50px"}}>{props.data.cause.name}</Badge>
        </Panel.Heading> 
        </div>
        {/* Event Title */}
        <Panel.Body>
          <Row style={{padding:20}}>

            <Col md={12} style={{paddingTop: 10}}><h4>{props.data.description}</h4></Col>
            
          <Col sm={3} md={6}>

          <h4 className="header">Date:</h4>
          <h4><Moment format="MM/DD/YYYY">{dateToFormat}</Moment></h4>
          <h4 className="header">Time:</h4>
          <h4><Moment format="HH:mm A">{dateToFormat}</Moment></h4>
          </Col>
          <Col sm={3} md={6}>

          <h4 className="header">Location:</h4>
          <h4>{props.data.location_name}</h4>
          <h4>{props.data.location_street}</h4>
          <h4>{props.data.location_city}, {props.data.location_state} {props.data.location_zip}</h4>   
          </Col>
          </Row>
          
        </Panel.Body>
        <Panel.Footer style={{color:"#00b9b4"}}>
          <a className="controls"><span onClick={props.handleButtonClick} data-type="join">Join</span></a>
          <a className="controls"><span onClick={props.handleButtonClick} data-type="share">Share</span></a>
          <a className="controls"><span onClick={props.handleButtonClick} data-type="contact">Contact Organizer</span></a>
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