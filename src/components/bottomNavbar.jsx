import React from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import { NavLink } from "react-router-dom"

export default function BottomNavbar() {
  return (
    <Navbar
      variant="dark"
      expand="lg">
      <Container>
        <Nav className="'me-auto">
          <>
            <Nav.Link
              as={NavLink}
              to="/addpost">
              Emotion button
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/chat">
              Chat
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/calendar">
              Calendar
            </Nav.Link>
          </>
        </Nav>
      </Container>
    </Navbar>
  )
}
