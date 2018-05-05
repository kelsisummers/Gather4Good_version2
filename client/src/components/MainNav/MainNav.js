import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import "./MainNav.css";
import AuthModal from "../AuthModal";

class MainNav extends Component {
  render() {
    console.log("Props?", this.props);
    return (
      <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/"><img className="logo" src="../assets/gather-logo.png"/></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1} href="/create">
                  Organize An Event
                </NavItem>
                <NavItem onClick={() => this.props.handleModalShow("loginBtnClick")}>
                  Login
                </NavItem>
                <NavItem onClick={() => this.props.handleModalShow("regBtnClick")}>
                  Register
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </div>
    )
  }
};

export default MainNav;
