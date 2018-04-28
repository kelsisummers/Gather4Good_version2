import React, { Component } from "react";
import { Badge, Jumbotron, Carousel, Button, Row, Col } from 'react-bootstrap';
import Footer from "../components/Footer"

class Home extends Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      indicators: false,
      controls: false
    };
  }

  render() {
    const { indicators, controls } = this.state;
    return (
      <div>

      <Carousel
        indicators={indicators}
        controls={controls}
      >
      <Carousel.Item>
        <img width={1440} height={500} alt="900x500" src="../assets/science_color.jpg" />
      </Carousel.Item>
      <Carousel.Item>
        <img width={1440} height={500} alt="900x500" src="../assets/fullpride.jpg" />
      </Carousel.Item>
      <Carousel.Item>
        <img width={1440} height={500} alt="900x500" src="../assets/immigration.jpg" />
      </Carousel.Item>
      <Carousel.Item>
        <img width={1440} height={500} alt="900x500" src="../assets/protest-header_signs.jpg" />
      </Carousel.Item>
    </Carousel>

    <Badge>LGBTQ</Badge>
    <Badge>Gun Violence</Badge>
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

    ) 
  }
}

export default Home;