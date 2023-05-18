import React from "react"
import { Navbar } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { NavLink } from "react-router-dom"

export default function BottomNavbar() {
  return (
    <Navbar fixed="bottom">
      <Container className="d-flex align-items-center m-5">
        <Nav className="me-auto">
          <Nav.Link
            as={NavLink}
            to="/calendar">
            <img
              className="icons "
              src="/calendar-date-fill.svg"
              alt="calendar-icon"
              width="32px"
              height="32px"
            />
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/addpost">
            <img
              className="icons"
              src="/plus-circle-fill.svg"
              alt="plus-icon"
              width="32px"
              height="32px"
            />
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/chat">
            <img
              className="icons "
              src="/chat-right-text-fill.svg"
              alt="icon-chat"
              width="32px"
              height="32px"
            />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
