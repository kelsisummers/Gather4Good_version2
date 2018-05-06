import React from "react";
import { Panel, Badge, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Moment from "react-moment";

export const EventCard = (props) => {
    let userId = props.userId;
    let organizerId = props.data.organizer_id;
    let attendees = props.data.attendees;
    const organizerBadge = (userId == organizerId) ? (<Badge style={{padding: '5px', color: 'white', opacity: '.5', borderRadius: '2px',}}>Organizer</Badge>) : (<div/>);
    const attendeeBadge = (attendees.includes(userId)) ? (<Badge>Going</Badge>) : (<div/>)
    console.log(props.data.title)
    console.log(props.data.cause.name);
    return (

        <Panel className='eventCard z-depth-2'>
        <Row>
        <Panel.Heading>
            <Col md={10}>
        <h1>{props.data.title}</h1>
        </Col>
        <Col md={2} style={{marginTop: 21, paddingRight:0}}>
          <Badge style={{ padding: '10px', borderRadius: 2, backgroundColor: '#00b9b4', fontSize: 14, color: 'white', opacity: '.7'}}>{props.data.cause.name}</Badge>
        </Col>
        </Panel.Heading>
        </Row>
            <Panel.Body>



            <p className="event-details"><span style={{fontSize: '22px', color: '#00b9b4'}}>Date:</span> <Moment format="MM/DD/YYYY @ hh:mm A">{props.data.dateTime}</Moment></p>
            <p className='event-details'><span style={{fontSize: '22px', color: '#00b9b4'}}>Location:</span> {props.data.location_city}, {props.data.location_state}</p>
            <p className='event-details'>{props.data.description}</p>

            </Panel.Body>
            <Panel.Footer style={{backgroundColor: 'transparent'}}>
            <div style={{float: 'right', marginTop:'10px', letterSpacing: '1px', }}>
            {organizerBadge}
            {attendeeBadge}
            </div>

            <Link style={{color: '#00b9b4', fontSize: '16px', display: 'inline-block', marginTop: '10px', }} to={`/event/${props.data._id}`}>
                LEARN MORE
            </Link>
            </Panel.Footer>

        </Panel>
    )

}
