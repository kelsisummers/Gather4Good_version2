import React from "react";
import { Badge } from 'react-bootstrap';

export const CauseButtons = (props) => { 
    return (
        props.causes.map((cause, i) => {
            return (
                
                <button className=" btn btn-success" key={[i]} causeid={cause._id} onClick={props.handleCauseButtonClick}>{cause.name}</button>
            )
        })
    )
} 

