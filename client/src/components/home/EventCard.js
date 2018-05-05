import React from "react";
import { Panel, Button, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Moment from "react-moment";



export const EventCard = (props) => {

    let userId = props.userId;
    let organizerId = props.data.organizer_id;
    let attendees = props.data.attendees;
    const organizerBadge = (userId == organizerId) ? (<Badge>Organizer</Badge>) : (<div/>);
    const attendeeBadge = (attendees.includes(userId)) ? (<Badge>Going</Badge>) : (<div/>)


    return (
        <Panel className='eventCard z-depth-2'>
            <h1>{props.data.title}</h1>
            <p className="event-details"><span style={{fontSize: '22px', color: '#00b9b4'}}>Date:</span> <Moment format="MM/DD/YYYY @ hh:mm A">{props.data.dateTime}</Moment></p>
            <p className='event-details'><span style={{fontSize: '22px', color: '#00b9b4'}}>Location:</span> {props.data.location_city}, {props.data.location_state}</p>
            <p className='event-details'>{props.data.description}</p>
            {organizerBadge}
            {attendeeBadge}
            <Link style={{color: '#00b9b4', fontSize: '16px', display: 'inline-block', marginTop: '10px'}} to={`/event/${props.data._id}`}>
                LEARN MORE
            </Link>

        </Panel>
    )

}
