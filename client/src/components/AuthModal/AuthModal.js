import React, {Component} from "react";
import "./AuthModal.css";
import { Row, Col, Nav, NavItem, Button, Modal, Tab } from 'react-bootstrap';
import LoginForm from "../LoginForm";
import RegForm from "../RegForm";
import ModalCTA from "../ModalCTA";
import ModalAuthErr from "../ModalAuthErr";

const AuthModal = (props) => {

    return (
      <div>
      <Modal show={props.showModal} onHide={props.handleModalClose}>
        <Modal.Header closeButton>
            <ModalCTA modalTriggerType={props.modalTriggerType}/>
        </Modal.Header>
        <Modal.Body>

          <Tab.Container
              id="tabs"
              activeKey={props.activeModalKey}
              onSelect={props.handleTabSelect}>
            <Row className="clearfix">
              <Col sm={12}>
                <Nav bsStyle="pills" style={{display: "flex", justifyContent: "center"}}>
                  <NavItem className="text-center" style={{width: "48%"}} eventKey={1}>Login</NavItem>
                  <NavItem className="text-center" style={{width: "48%"}} eventKey={2}>Register</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey={1}> <LoginForm {...props}/> </Tab.Pane>
                  <Tab.Pane eventKey={2}> <RegForm {...props}/> </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

          </Modal.Body>
          <Modal.Footer>
            <ModalAuthErr auth_error={props.auth_error} />
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default AuthModal;
