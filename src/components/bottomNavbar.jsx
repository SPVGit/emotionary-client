import React from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"

import Navbar from "react-bootstrap/Navbar"
import Col from "react-bootstrap/Col"

import { NavLink } from "react-router-dom"

export default function BottomNavbar() {
  return (
    <Container
      fixed="bottom"
      className="d-flex flex-row m-5">
      {/* <Container className="d-flex justify-content-center"> */}
      {/* <Nav className="'me-auto flex-row  bg-light rounded p-1"> */}
      <Nav.Link
        as={NavLink}
        to="/calendar">
        <img
          className="icons m-2 "
          src="/calendar-date-fill.svg"
          alt="calendar-icon"
          width="52px"
          height="52px"
        />
      </Nav.Link>
      <Nav.Link
        as={NavLink}
        to="/addpost">
        <img
          className="icons m-2 "
          src="/plus-circle-fill.svg"
          alt="plus-icon"
          width="52px"
          height="52px"
        />
      </Nav.Link>

      <Nav.Link
        as={NavLink}
        to="/chat">
        <img
          className="icons m-2"
          src="/chat-right-text-fill.svg"
          alt="icon-chat"
          width="52px"
          height="52px"
        />
      </Nav.Link>
      {/* </Nav> */}
      {/* </Container> */}
    </Container>
  )
}
