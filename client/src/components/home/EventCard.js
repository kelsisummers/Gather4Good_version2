import React from "react";
import { Panel, Button, Badge } from 'react-bootstrap';


export const EventCard = (props) => {
    
    let userId = props.userId;
    let organizerId = props.data.organizer_id;
    let attendees = props.data.attendees;
    const organizerBadge = (userId == organizerId) ? (<Badge>Organizer</Badge>) : (<div/>);
    const attendeeBadge = (attendees.includes(userId)) ? (<Badge>Going</Badge>) : (<div/>)


    return (
        <Panel>
            <h1>{props.data.title}</h1>
            {organizerBadge}
            {attendeeBadge}
            <p>{props.data.description}</p>
            <Button bsStyle="primary" eventId={props.data._id} eventTitle={props.data.title} onClick={props.handleJoinEventButtonClick}>Join Event</Button>
        </Panel>
    )

}