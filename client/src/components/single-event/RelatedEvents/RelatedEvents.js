import React, { Component } from "react";
import EventCard from "./EventCard.js";

export class RelatedEvents extends Component {
    state = {
        events: [{ id: 1, title: "Event 1" }, { id: 2, title: "Event 2"}] 
    }

    render () {
        return (
            <div className="boxes">
                <h2>Related Events</h2>

                {/* Grabs cause of event displayed for query to fetch related events */}
                <h3>{this.props.eventCause}</h3>

                    {this.state.events.map(event => {
                        return (
                            <EventCard 
                                key = {event.id}
                                title = {event.title}
                            />
                        )
                    })}
            </div>
        )
    }
}