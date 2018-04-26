import React from "react";

export const Header = (props) => {
    return (
        <div className="boxes">
            <h2>Header</h2>
            <p>{props.data.img_url}</p>
        </div>
    )
}