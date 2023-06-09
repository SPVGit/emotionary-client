import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/auth.context"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

const API_URL = process.env.REACT_APP_API_URL

const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [validated, setValidated] = useState(false)

  const navigate = useNavigate()
  const { storedToken, authenticateUser } = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, password }

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {

        storedToken(response.data.authToken)
        authenticateUser()

        navigate("/posts")  //if user logs in, navigate to the /posts page
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <Container className="LoginPage text-center justify-content-center d-flex">
      <div className="mw-75 text-center ">
        <h1>Login</h1>

        <Form
          style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column" }}
          noValidate
          validated={validated}
          onSubmit={handleLoginSubmit}>
          <Row
            className="mb-3"
            width="80vw">
            <Form.Group>
              <Form.Label className="label ">Email</Form.Label>
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
            <Form.Group>
              <Form.Label className="label ">Password</Form.Label>
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
            style={{ width: "100%", margin: "16px 0px" }}
            variant="dark"
            type="submit">
            Log in
          </Button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Don't have an account yet?</p>

          <Button
            style={{ width: "100%" }}
            variant="dark"
            onClick={handleSignup}>
            {" "}
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default LoginPage
