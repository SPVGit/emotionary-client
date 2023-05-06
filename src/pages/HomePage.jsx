import React from "react"
import { Container } from "react-bootstrap"

const HomePage = () => {
  return (
    <div className="home-page">
      <Container>
        <h1
          style={{ fontSize: "80px" }}
          className="fade-in text-center text-white">
          How are you feeling today?
        </h1>
      </Container>
    </div>
  )
}

export default HomePage
