import React, { Component } from "react";
import "./SingleEvent.css";
import { Event, DiscussionContainer, RelatedEvents } from "../../components/single-event";
import API from "../../utils/API.js";
import Auth from "../../utils/Auth.js";

class SingleEvent extends Component {

    state = {
        error: null,
        isLoaded: false,
        event: [],
        attending: false,
        isOrganizer: false,
        isEditingEvent: false,
        editEvent: {}
    };

    // Once Container mounts, sends request to server to retrieve events (will probably want to query for a single event by id, obtained
    //  through props), updates state, and renders SingleEvent with the data.
    componentDidMount() {

        API.getEvent(this.props.match.params.id)
            .then((event) => {
                console.log("Event data?", event.data);

                this.setState({
                    isLoaded: true,
                    event: event.data,
                    editEvent: event.data,
                    attending: event.data.attendees.includes(this.props.authData.user_id), // Checks if userId matches any in Attendee array.
                    isOrganizer: (this.props.authData.user_id === event.data.organizer_id)
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

    componentDidUpdate = (prevProps, prevState, snapshot) => {
      console.log(prevProps);
      console.log("Component did update called");
      console.log(prevProps.authData.user_id);
      console.log(this.props.authData.user_id);
      if(prevProps.authData.user_id !== this.props.authData.user_id) {
        this.setState({isOrganizer: (this.props.authData.user_id === this.state.event.organizer_id)})
      }
    }

    handleEditToggle = (event) => {
       this.setState({isEditingEvent :  !this.state.isEditingEvent})
    }

    handleButtonClick = (event) => {
        let btnType = event.target.dataset.type;
        let userId = this.props.authData.user_id;
        let eventId = this.state.event._id;
        console.log(userId);
        console.log(eventId);
        switch (btnType) {
            case "join":
                // logic to join an event
                if(Auth.isTokenNullOrExpired) {
                    this.props.authFunctions.clearAuthAndShowModal("joinEvent");
                } else {
                    API.joinEvent(userId, eventId)
                        .then((event) => {
                            this.setState({
                                attending: event.data.attendees.includes(this.props.authData.user_id),
                                event: event.data
                            })
                        }) // Need to work out error handling here... i.e. the user is not logged in.
                }
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
        console.log("Is organizer:", this.state.isOrganizer);
        const { error, isLoaded, event, attending, isOrganizer, editEvent, isEditingEvent } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (

                <div>
                    <Event
                        data={event}
                        editData={editEvent}
                        handleButtonClick={this.handleButtonClick}
                        attending={attending}
                        isOrganizer={isOrganizer}
                        handleEditToggle={this.handleEditToggle}
                        isEditingEvent={isEditingEvent}
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
