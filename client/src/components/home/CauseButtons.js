import React from "react";
import { Badge } from 'react-bootstrap';

export const CauseButtons = (props) => { 
    return (
        props.causes.map((cause) => {
            return (
                <button causeId={cause._id} onClick={props.handleCauseButtonClick}>{cause.name}</button>
            )
        })
    )
} 

