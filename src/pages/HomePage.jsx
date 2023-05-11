import React from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate("/signup")
  }, 2000)

  return (
    <div className="home-page">
      <Container>
        <h1
          style={{ fontSize: "80px" }}
          className="fade-in-out text-center text-white">
          How are you feeling today?
        </h1>
      </Container>
    </div>
  )
}

export default HomePage
