import React from "react";
import { Button, Panel } from 'react-bootstrap';
import moment from "moment";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import * as Datetime from 'react-datetime';

export const Controls = (props) => {
    return (
        <Panel className='sort-controls'>
            <h1 style={{marginTop: "0px"}}>Filter By</h1>
            <Button className="btn sort-btn" onClick={props.myEvents}>My Events</Button>
            <Button className="btn sort-btn" onClick={props.displayDateSelector}>Date</Button>
                {props.dateSelect ?
                  <SingleDatePicker
                    date={props.date}
                    onDateChange={props.handleDateChange}
                    focused={props.focused}
                    onFocusChange={props.handleDateFocusChange}
                    numberOfMonths={1}
                  /> :
                  null
                }
            <Button className="btn sort-btn" onClick={props.sortByLocation}>Location</Button>
            <Button className="btn sort-btn" onClick={props.displayAllEvents}>All Events</Button>
        </Panel>
    )
}
