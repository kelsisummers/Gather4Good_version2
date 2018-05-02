import React, { Component } from "react";
import "./SingleEvent.css";
import { Event, DiscussionContainer, RelatedEvents } from "../../components/single-event";
import API from "../../utils/API.js";

class SingleEvent extends Component {

    state = {
        error: null,
        isLoaded: false,
        event: [],
        attending: false
    };

    // Once Container mounts, sends request to server to retrieve events (will probably want to query for a single event by id, obtained
    //  through props), updates state, and renders SingleEvent with the data.
    componentDidMount() {
        // will pass "this.props.id" to API.getEvent as arg.
        API.getEvent("5ae8fd1542f30a3288679a52")
            .then((event) => {
                console.log("Event data?", event.data);
                
                this.setState({
                    isLoaded: true,
                    event: event.data,
                    attending: event.data.attendees.includes(this.props.authData.user_id) // Checks if userId matches any in Attendee array.
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    handleButtonClick = (event) => {
        let btnType = event.target.dataset.type;
        let userId = this.props.authData.user_id;
        let eventId = this.state.event._id;
        console.log(userId);
        console.log(eventId);
        switch (btnType) {
            case "join":
                // logic to join an event
                API.joinEvent(userId, eventId)
                    .then((event) => {
                        this.setState({
                            attending: event.data.attendees.includes(this.props.authData.user_id)
                        })
                    }) // Need to work out error handling here... i.e. the user is not logged in.
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
    };

    render() {
        console.log("What is state?", this.state.event)
        console.log("....")
        console.log(this.state.attending);
        const { error, isLoaded, event, attending } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
        
                <div>
                    <Event
                        data={event}
                        handleButtonClick={this.handleButtonClick}
                        attending = {attending}
                    />
                    {/* <DiscussionContainer
                    data={this.props.event}
                    />
                    <RelatedEvents
                    eventCause="eventJSON.cause"
                    /> */}
                </div>
            );
        }
    }

}

export default SingleEvent;
