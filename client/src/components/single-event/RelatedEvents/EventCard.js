import React from "react";

const EventCard = (props) => {
    return (
        <div className="miniEvent">
            <h3>{props.title}</h3>
        </div>
    )
}

export default EventCard