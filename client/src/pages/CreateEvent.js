import React, {Component} from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import EventForm from "../components/EventForm"

class CreateEvent extends Component {
  render() {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <EventForm />
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default CreateEvent;
