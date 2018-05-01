import React from "react";
import { Panel, Button } from 'react-bootstrap';


export const EventCard = (props) => {
    
        let userId = props.userId;
        let organizerId = props.data.organizer_id;
        if(userId == organizerId) {
            return (
                <Panel>
                    <h1>{props.data.title}</h1>
                    <h2>Organizer ID: {organizerId}</h2>
                    
                    <p>{props.data.description}</p>
                    <Button bsStyle="primary" eventId={props.data._id} eventTitle={props.data.title} onClick={props.handleJoinEventButtonClick}>Join Event</Button>
                </Panel>
            )

        } else {
            return (
                <Panel>
                    <h1>{props.data.title}</h1>
                    <p>{props.data.description}</p>
                    <Button bsStyle="primary" eventId={props.data._id} eventTitle={props.data.title} onClick={props.handleJoinEventButtonClick}>Join Event</Button>
                </Panel>
            )

        }

    
}