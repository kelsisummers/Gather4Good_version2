import React from "react";
import { Button } from 'react-bootstrap';

export default const JoinBtn = (props) => {

    if(props.isOrganizer) {
      return null;
    } else {

      if(!props.attending) {
        return (
               <a className="controls">
                <span style={{cursor: "pointer"}} onClick={props.handleButtonClick} data-type="join">Join</span>
               </a>
              )
      } else {
        return (
               <a className="controls">
                <span onClick={props.handleButtonClick} data-type="unjoin">Unjoin</span>
               </a>
             )
      }

    }
  }

export default JoinBtn;
