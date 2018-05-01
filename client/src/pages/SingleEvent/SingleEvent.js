import React, { Component } from "react";
import "./SingleEvent.css";
import { Event, Details, Controls, DiscussionContainer, RelatedEvents } from "../../components/single-event";
import API from "../../utils/API.js";

class SingleEvent extends Component {

    state = {
        error: null,
        isLoaded: false,
        event: []
    };

    // Once Container mounts, sends request to server to retrieve events (will probably want to query for a single event by id, obtained
    //  through props), updates state, and renders SingleEvent with the data.
    componentDidMount() {
        // will pass "this.props.id" to API.getEvent as arg.
        API.getEvent("5ae28c48e653ce2ad8cfc936")
            .then((event) => {
                console.log(event.data);
                this.setState({
                    isLoaded: true,
                    event: event.data
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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
        const { error, isLoaded, event } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Event
                        data={this.state.event}
                    />
                    <DiscussionContainer
                    data={this.props.event}
                    />
                    <RelatedEvents
                    eventCause="eventJSON.cause"
                    />
                </div>
            );
        }
    }

}

export default SingleEvent;