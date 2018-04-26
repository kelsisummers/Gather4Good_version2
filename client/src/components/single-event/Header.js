import React from "react";

export const Header = (props) => {
    return (
        <div className="boxes">
            <h2>Header</h2>
            <p>{props.image}</p>
        </div>
    )
}