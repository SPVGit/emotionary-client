import React from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const HomePage = () => {
  const { isLoggedIn,user,therapist} = useContext(AuthContext);
  const navigate = useNavigate()

  if (!isLoggedIn) {
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
  else if(isLoggedIn && user){
   navigate('/posts')
  }
  else if(isLoggedIn && therapist){
    navigate('/users')
  }


}

export default HomePage
