import React from "react";

export const CauseButtons = (props) => { 
    return (
        props.causes.map((cause, i) => {
            return (
                
                <button className="cause-buttons" key={[i]} causeid={cause._id} onClick={props.handleCauseButtonClick}>{cause.name}
                
                <span className= 'glyphicon glyphicon-chevron-right'></span></button>
            )
        })
    )
} 

