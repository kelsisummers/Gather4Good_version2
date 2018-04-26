import React, { Component } from "react";
import "./SingleEvent.css";
import { Header, Details, Controls, Discussion, RelatedEvents } from "../../components/single-event";

class SingleEvent extends Component {

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
                data={this.props.events[1]}
            />
            <Details
                data={this.props.events[1]}
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

export default SingleEvent;