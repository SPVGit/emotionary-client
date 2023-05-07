import React from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import { NavLink } from "react-router-dom"

export default function BottomNavbar() {
  return (
    <Navbar
      variant="dark"
      expand="lg"
      fixed="bottom">
      <Container className="d-flex justify-content-center ">
        <Nav className="'me-auto flex-row ">
          <Nav.Link
            className="m-4 p-2"
            as={NavLink}
            to="/calendar">
            <img
              className="icons"
              src="/calendar-date-fill.svg"
              alt="calendar-icon"
              width="60px"
              height="40px"
            />
          </Nav.Link>
          <Nav.Link
            className="m-5 p-2"
            as={NavLink}
            to="/addpost">
            <img
              className="icons"
              src="/plus-circle-fill.svg"
              alt="plus-icon"
              width="90px"
              height="90px"
            />
          </Nav.Link>

          <Nav.Link
            className="m-4 p-2"
            as={NavLink}
            to="/chat">
            <img
              className="icons"
              src="/chat-right-text-fill.svg"
              alt="icon-chat"
              width="60px"
              height="60px"
            />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
