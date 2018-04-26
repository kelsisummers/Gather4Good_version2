import React from "react";

export const Controls = (props) => {
    return (
        <div className="boxes">
        <h2>Controls</h2>
            <button onClick={props.handleButtonClick} data-type="join">Join/Unjoin</button>
            <button onClick={props.handleButtonClick} data-type="share">Share</button>
            <button onClick={props.handleButtonClick} data-type="contact">Contact Organizer</button>
        </div>
    )
}

