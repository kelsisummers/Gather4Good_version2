import React from "react";
import { Button } from 'react-bootstrap';

export const JoinBtn = (props) => {

    let joinBtn;
    if(props.isOrganizer) {
      joinBtn = null
    } else {

      if(!props.attending) {
        joinBtn = (
               <a style={{cursor: "pointer", textDecoration: "none"}} className="controls">
                <span onClick={props.handleButtonClick} data-type="join">Join</span>
               </a>
              )
      } else {
        joinBtn = (
               <a style={{cursor: "pointer", textDecoration: "none"}} className="controls">
                <span onClick={props.handleButtonClick} data-type="unjoin">Unjoin</span>
               </a>
             )
      }

    }

    return (joinBtn)
  }

export default JoinBtn;
