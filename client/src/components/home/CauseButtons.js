import React from "react";
import { Badge } from 'react-bootstrap';

export const CauseButtons = (props) => { 
    return (
        props.causes.map((cause, i) => {
            return (
                <button key={[i]} causeid={cause._id} onClick={props.handleCauseButtonClick}>{cause.name}</button>
            )
        })
    )
} 

