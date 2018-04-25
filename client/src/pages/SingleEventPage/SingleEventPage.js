import React, { Component } from "react";
import "./SingleEventPage.css";
import { Header, Details, Controls, Discussion, RelatedEvents } from "../../components/single-event";

class SingleEventPage extends Component {

state = {
    // currentEvent : {eventJSON}

}

handleButtonClick(event) {
    let btnType = event.target.dataset.type;
    switch (btnType) {
        case "join":
            // logic to join an event
            alert(btnType);            
            break;
        case "share":
            // logic to share an event
            alert(btnType); 
            break;
        case "contact":
            //logic to contact organizer
            alert(btnType); 
            break;
        default:
            alert(btnType);
    }
}

render() {
    return (
        <div>
            <Header
                image="event.JSON.image"
            />
            <Details
                title="eventJSON.title"
                date="eventJSON.date"
                time="eventJSON.time"
                description="eventJSON.description"
                organizer="eventJSON.organizer"
                locationName="eventJSON.locationName"
                address="eventJSON.address"
            />
            <Controls
                handleButtonClick={this.handleButtonClick}
            />
            <Discussion
                comments="eventJSON.comments"
            />
            <RelatedEvents
                eventCause="eventJSON.cause"
            />
        </div>
    )
}

}

export default SingleEventPage;