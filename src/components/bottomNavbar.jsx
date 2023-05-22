import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"

const API_URL = process.env.REACT_APP_API_URL

export default function BottomNavbar() {
  const { user, therapist } = useContext(AuthContext)
  const [theTherapist, setTheTherapist] = useState([])
  const storedToken = localStorage.getItem("authToken")

  const navigate = useNavigate()

  const getTherapist = () => {
    axios
      .get(`${API_URL}/therapist`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const myTherapist = response.data
        setTheTherapist(myTherapist)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getTherapist()
  }, [])

  // CHAT button //
  const handleChatClick = (chatTherapistId) => {
    //const storedToken = localStorage.getItem("authToken")
    /*   if(!user){
          navigate('/signin')
          return; 
      }*/
    //   else {
    let data = {
      participants: [chatTherapistId, user._id],
    }
    axios
      .post(`${API_URL}/conversation`, data, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const data = response.data._id
        navigate(`/chat/${data}`)
     
      })
      .catch((error) => console.log(error))

    //  }
  }

  return (
    <Navbar fixed="bottom">
      <Container className="d-flex justify-content-center mb-2">
        <Nav
          style={{ width: "50vw", padding: "8px" }}
          className="bg-white rounded justify-content-between d-flex">
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

          {theTherapist.map((chatTherapist) => {
            return (
              <Nav.Link key={chatTherapist._id}>
                <img
                  onClick={() => handleChatClick(chatTherapist._id)}
                  src="/chat-right-text-fill.svg"
                  className="icons "
                  alt="icon-chat"
                  width="32px"
                  height="32px"
                />
              </Nav.Link>
            )
          })}
        </Nav>
      </Container>
    </Navbar>
  )
}
