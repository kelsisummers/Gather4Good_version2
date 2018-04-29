import React from "react";
import { Panel } from 'react-bootstrap';

export const Event = (props) => {
  return (
    <div>
      <Panel>
        {/* Event Image */}
        <img src={props.data.img_url} />
        {/* Event Title */}
        <Panel.Heading>{props.data.title}</Panel.Heading>
        <Panel.Body>
          <h4>Description:</h4>
          <h4>{props.data.description}</h4>
          <h4>Date:</h4>
          <h4>{props.data.dateTime}</h4>
          <h4>Location:</h4>
          <h4>{props.data.location_name}</h4>
          <h4>{props.data.location_street}</h4>
          <h4>{props.data.location_city}, {props.data.location_state} {props.data.location_zip}</h4>
        </Panel.Body>
        <Panel.Footer>
          <button onClick={props.handleButtonClick} data-type="join">Join/Unjoin</button>
          <button onClick={props.handleButtonClick} data-type="share">Share</button>
          <button onClick={props.handleButtonClick} data-type="contact">Contact Organizer</button>
        </Panel.Footer>
      </Panel>
    </div>
  )
}