import React, { Component } from "react";
import { Badge, Jumbotron, Carousel, Button, Row, Col } from 'react-bootstrap';
import API from "../../utils/API.js";
import { Header, CauseButtons } from "../../components/home";

class Home extends Component {

  state = {
    error: null,
    isLoaded: false,
    events: [],
    causes: [],
    indicators: false,
    controls: false
  };

  componentDidMount() {
    API.getAllEvents()
      .then((events) => {
        console.log(events.data);
        this.setState({
          isLoaded: true,
          events: events.data
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
            indicators = {this.state.indicators}
            controls = {this.state.controls}  
          />
          <CauseButtons />
          <Row>
            <Col md={8}>
              <Jumbotron>
                <h1>Event Title</h1>
                <p>
                  Event Description
      </p>
                <p>
                  <Button bsStyle="primary">Join Event</Button>
                </p>
              </Jumbotron>
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