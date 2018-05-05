import React from "react";
import { Button, Panel } from 'react-bootstrap';

export const Controls = (props) => {
    return (
        <Panel className='sort-controls'>
            <Button className="sort-btn" onClick={props.myEvents}>My Events</Button>
            <Button className="sort-btn" onClick={props.sortByDate}>Date</Button>
            <Button className="sort-btn" onClick={props.sortByLocation}>Location</Button>
            <Button className="sort-btn" onClick={props.displayAllEvents}>All Events</Button>
        </Panel>
    )
}