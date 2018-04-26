import React, { Component } from "react";
import SingleEvent from "./SingleEvent.js";
let axios = require("axios");

class Container extends Component {
    state = {
        error: null,
        isLoaded: false,
        events: []
    };
    
    // Once Container mounts, sends request to server to retrieve events (will probably want to query for a single event by id, obtained
    //  through props), updates state, and renders SingleEvent with the data.
    componentDidMount() {
        axios.get("/api/events")
            .then((events) => {
                console.log(events.data);
                this.setState({
                    isLoaded: true,
                    events: events.data
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

    render() {
        const { error, isLoaded, event } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <SingleEvent
                    events = {this.state.events}
                />
            );
        }
    }
}

export default Container