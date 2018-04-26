import React from "react";

export const Details = (props) => {
    return (
        <div className="boxes">
            <h2>Details</h2>
            <ul>
                <li>{props.data.title}</li>
                <li>{props.data.dateTime}</li>
                <li>{props.data.description}</li>
                <li>{props.data.location_city}</li>
                <li>{props.data.location_name}</li>
                <li>{props.data.location_state}</li>
                <li>{props.data.location_street}</li>
                <li>{props.data.location_zip}</li>
            </ul>
        </div>
    )
}