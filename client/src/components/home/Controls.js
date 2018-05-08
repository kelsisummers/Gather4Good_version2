import React from "react";
import { Button, Panel, Row, Col } from 'react-bootstrap';
import moment from "moment";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import * as Datetime from 'react-datetime';

export const Controls = (props) => {
    return (
      <Panel className='sort-controls'>
        <h3 style={{marginTop: "0px"}}>Filter By</h3>
        <Row>
          <Col md={4}>
            <Button className="sort-btn" onClick={props.myEvents}>My Events</Button>
          </Col>
          <Col style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} md={2}>
            <Button className="sort-btn" onClick={props.displayDateSelector}>Date</Button>

              {props.dateSelect ?
                <Row style={{marginBottom: '30px'}}>
                  <Col style={{marginLeft: '25px', display: 'flex', justifyContent: 'center'}}>
                    <SingleDatePicker
                      date={props.date}
                      onDateChange={props.handleDateChange}
                      focused={props.focused}
                      onFocusChange={props.handleDateFocusChange}
                      numberOfMonths={1}
                    />
                  </Col>
                </Row > : null}

          </Col>
          <Col md={4}>
            <Button className="sort-btn" onClick={props.sortByLocation} >Location</Button>    
          </Col>
          <Col md={2}>
            <Button className="sort-btn" onClick={props.displayAllEvents}>All Events</Button>
          </Col>
        </Row>



        {props.locationSelect ?
          <Row>
            <Col>
            <select
                      type="text"
                      name="USstate"
                      id='USstate'
                      value={props.USstate}
                      placeholder="Select a State"
                      onChange={props.handleInputChange}>

                        <option id='option-select' key="default" value="Select a State" disabled={true} hidden={true}>Select a State</option>
                        {props.eventStateList.map((state, i) => (
                          <option value={state} key={i}>{state}</option>
                        ))}
                    </select>
            </Col>
          </Row> : null }
        </Panel>
    )
}
