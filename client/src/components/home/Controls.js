import React from "react";
import { Jumbotron,  Button } from 'react-bootstrap';

export const Controls = (props) => {
    return (
        <Jumbotron>
            <h1>Sort By</h1>
            <Button bsStyle="primary" onClick={props.myEvents}>My Events</Button>
            <Button bsStyle="primary" onClick={props.sortByDate}>Date</Button>
            <Button bsStyle="primary" onClick={props.sortByLocation}>Location</Button>
            <Button bsStyle="primary" onClick={props.displayAllEvents}>All Events</Button>
        </Jumbotron>
    )
}