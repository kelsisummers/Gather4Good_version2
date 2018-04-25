import React from "react";

export const Details = (props) => {
    return (
        <div className="boxes">
            <h2>Details</h2>
            <ul>
                <li>props.title</li>
                <li>props.date</li>
                <li>props.time</li>
                <li>props.description</li>
                <li>props.organizer</li>
                <li>props.locationName</li>
                <li>props.address</li>
            </ul>
        </div>
    )
}