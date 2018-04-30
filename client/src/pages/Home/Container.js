import React, { Component } from "react";
import Home from "./Home.js";
import API from "../../utils/API.js";

class Container extends Component {
    state = {
        error: null,
        isLoaded: false,
        events: [],
        causes: []
    };

    componentDidMount() {
        API.getAllEvents()
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
        const { error, isLoaded, events } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Home
                    events={this.state.events}
                    causes={this.state.causes}
                />
            );
        }
    }
}

export default Container