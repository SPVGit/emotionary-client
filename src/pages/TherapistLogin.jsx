 import React from "react"
import { useState, useContext } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import { AuthContext } from "../context/auth.context"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import { Container } from "react-bootstrap"

const API_URL = "http://localhost:5006"

export default function TherapistLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const { storedTherapistToken, authenticateTherapist} = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, password }

    axios
      .post(`${API_URL}/auth/therapistlogin`, requestBody)
      .then((response) => {

        console.log("JWT token", response.data.authTherapistToken)
        storedTherapistToken(response.data.authTherapistToken)
        authenticateTherapist()
        navigate("/users") // <== ADD
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <Container className="TherapistLoginPage">
      <h1>Login and follow your patients</h1>

      <Form
        style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column" }}
        noValidate
        validated={validated}
        onSubmit={handleLoginSubmit}>
        <Row
          className="mb-3"
          width="80vw">
          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              placeholder="Your Email"
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustomUsername">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                required
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
              <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Button
          variant="dark"
          type="submit">
          Log in
        </Button>
      </Form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Container>
  )
}
 