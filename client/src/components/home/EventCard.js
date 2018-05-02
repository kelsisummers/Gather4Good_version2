import React from "react";
import { Panel, Button, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";


export const EventCard = (props) => {
    
    let userId = props.userId;
    let organizerId = props.data.organizer_id;
    let attendees = props.data.attendees;
    const organizerBadge = (userId == organizerId) ? (<Badge>Organizer</Badge>) : (<div/>);
    const attendeeBadge = (attendees.includes(userId)) ? (<Badge>Going</Badge>) : (<div/>)


    return (
        <Panel>
            <h1>{props.data.title}</h1>
            <h3>{props.data.location_city}, {props.data.location_state}</h3>            
            <p>{props.data.description}</p>
            {organizerBadge}
            {attendeeBadge}
            
                <Link to={`/event/${props.data._id}`}>
                Learn More
                </Link>
            
        </Panel>
    )

}