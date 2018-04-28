import React, { Component } from "react";
import SingleEvent from "./SingleEvent.js";
import API from "../../utils/API.js";

class Container extends Component {
    state = {
        error: null,
        isLoaded: false,
    };
    
    // Once Container mounts, sends request to server to retrieve events (will probably want to query for a single event by id, obtained
    //  through props), updates state, and renders SingleEvent with the data.
    componentDidMount() {
        // will pass "this.props.id" to API.getEvent as arg.
        API.getEvent("5ae4a6ad9040e93e4ec5b044")
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

    render() {
        const { error, isLoaded, event } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <SingleEvent
                    event = {this.state.event}
                />
            );
        }
    }
}

export default Container