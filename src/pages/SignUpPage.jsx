import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import { Container } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_URL

function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [validated, setValidated] = useState(false)

  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handleName = (e) => setName(e.target.value)

  const handleTherapistLogin = () => {
    navigate("/therapistlogin")
  }

  const handleUserLogin = () => {
    navigate("/login")
  }

  const handleSignupSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)

    const requestBody = { email, password, name }

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
    navigate("/login")
  }

  return (
    <Container className="d-flex justify-content-center">
      <div className="SignupPage fade-in text-center mw-7  ">
        <h1>
          Join Emotionary, <br /> express yourself.
        </h1>

        <Form
          style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column" }}
          noValidate
          validated={validated}
          onSubmit={handleSignupSubmit}>
          <Row
            className="mb-3"
            width="80vw">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                placeholder="Your name"
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
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
            Sign Up
          </Button>
        </Form>

        <Container style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center", gap: "8px" }}>
          <p>Already have account?</p>
          <Button
            variant="dark"
            type="submit"
            onClick={handleUserLogin}>
            Login
          </Button>
          <p>or</p>
          <Button
            variant="light"
            type="submit"
            onClick={handleTherapistLogin}>
            Log in as Therapist
          </Button>
        </Container>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </Container>
  )
}

export default SignupPage
