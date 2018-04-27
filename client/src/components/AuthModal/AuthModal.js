import React, {Component} from "react";
import "./AuthModal.css";
import { Row, Col, Nav, NavItem, Button, Modal, Tab } from 'react-bootstrap';
import LoginForm from "../LoginForm";
import RegForm from "../RegForm";

class AuthModal extends Component {

  state = {
    show: false,
    key: this.props.activeKey
  }

  handleClose = () =>  {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleSelect = (key) => {
    console.log(`selected ${key}`);
    this.setState({ key });
  }

  render() {
    return (
      <div>
      <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
        Test modal
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>

          <Tab.Container
              id="tabs"
              activeKey={this.state.key}
              onSelect={this.handleSelect}>
            <Row className="clearfix">
              <Col sm={12}>
                <Nav bsStyle="pills" style={{display: "flex", justifyContent: "center"}}>
                  <NavItem className="text-center" style={{width: "48%"}} eventKey={1}>Login</NavItem>
                  <NavItem className="text-center" style={{width: "48%"}} eventKey={2}>Register</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey={1}> <LoginForm /> </Tab.Pane>
                  <Tab.Pane eventKey={2}> <RegForm /> </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

          </Modal.Body>
          <Modal.Footer>
            {this.state.key === 1 ? (
              <Button onClick={this.handleClose}>Login</Button>
            ) : (
              <Button onClick={this.handleClose}>Register</Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default AuthModal;
