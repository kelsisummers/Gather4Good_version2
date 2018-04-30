import React, { Component } from "react";
import { Badge, Jumbotron, Carousel, Button, Row, Col } from 'react-bootstrap';
import API from "../../utils/API.js";
import { Header, CauseButtons, EventCard } from "../../components/home";

class Home extends Component {

  state = {
    error: null,
    isLoaded: false,
    events: [],
    causes: [],
    indicators: false,
    controls: false
  };

  // After componenet mounts, makes API call to query for all events and causes. Once received, updates state and loads child components.
  componentDidMount() {
    let promises = [API.getAllEvents(), API.getCauses()];
    Promise.all(promises)
      .then((values) => {
        console.log(values);
        this.setState({
          isLoaded: true,
          events: values[0].data,
          causes: values[1].data
        })
      }, (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
  };

  // For now just alerts cause button data, will implement logic to Setstate to display events by cause.
  handleCauseButtonClick(event) {
    alert(`Cause: ${event.target.innerHTML} \nCause ID: ${event.target.getAttribute("causeId")}`);
  }

  handleJoinEventButtonClick(event) {
    alert(`Event: ${event.target.getAttribute("eventTitle")} \nEvent ID: ${event.target.getAttribute("eventId")}`);
  }

  render() {
    const { error, isLoaded, events, indicators, controls } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Header
            indicators={this.state.indicators}
            controls={this.state.controls}
          />
          <CauseButtons 
            causes={this.state.causes}
            handleCauseButtonClick={this.handleCauseButtonClick}
          />
          <Row>

            <Col md={8}>
              <div>
                {this.state.events.map((event) => {
                  return ( 
                    <EventCard 
                      data = {event}
                      handleJoinEventButtonClick = {this.handleJoinEventButtonClick}
                    />
                  )
                })}
                
              </div>
            </Col>

            <Col md={4}>
              <Jumbotron>
                <h1>Sort By</h1>
                <Button bsStyle="primary">My Events</Button>
                <Button bsStyle="primary">Date</Button>
                <Button bsStyle="primary">Location</Button>
                <Button bsStyle="primary">All Events</Button>
              </Jumbotron>
            </Col>

          </Row>
        </div>
        
      );
    }
  }
}

export default Home;