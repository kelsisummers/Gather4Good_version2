import React from "react";
import { Button, Panel } from 'react-bootstrap';

export const Controls = (props) => {
    return (
        <Panel className='sort-controls'>
            <h1 style={{marginTop: "0px"}}>Sort By</h1>
            <Button bsStyle="btn sort-btn" onClick={props.myEvents}>My Events</Button>
            <Button bsStyle="btn sort-btn" onClick={props.sortByDate}>Date</Button>
            <Button bsStyle="btn sort-btn" onClick={props.sortByLocation}>Location</Button>
            <Button bsStyle="btn sort-btn" onClick={props.displayAllEvents}>All Events</Button>
        </Panel>
    )
}