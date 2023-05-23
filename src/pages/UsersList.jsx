import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

/* Displays the list of users on the therapist's dash board. The therapist can then click on a chat button to access a chat box to be
able to chat to the users */

const API_URL = process.env.REACT_APP_API_URL

function UsersList() {
  const { therapist } = useContext(AuthContext)
  const navigate = useNavigate()

  const [users, setUsers] = useState([])

  const storedToken = localStorage.getItem("authTherapistToken")

  const getUsers = () => {
    //GETS LIST OF USERS

    axios
      .get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const allUsers = response.data
        setUsers(allUsers)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleChatClick = (chatUserId) => {
    //CHAT BUTTON

    let data = {
      participants: [chatUserId, therapist._id],
    }
    axios.post(`${API_URL}/conversation`, data, { headers: { Authorization: `Bearer ${storedToken}` } }).then((response) => {
      navigate(`/therchat/${response.data._id}`)
    })
  }

  return (
    <Container>
      <Row
        className="d-flex justify-content-center"
        style={{ padding: "10px 10px" }}>
        {users.map((chatUser) => {
          return (
            <Col
              key={chatUser._id}
              className="d-flex justify-content-center text-center">
              <Card style={{ margin: "10px", padding: 10, width: "40vw" }}>
                <Card.Header>
                  <Card.Title>
                    <h5>{chatUser.name.charAt(0).toUpperCase() + chatUser.name.slice(1)}</h5>
                  </Card.Title>
                </Card.Header>
                <Button
                  variant="dark"
                  onClick={() => {
                    handleChatClick(chatUser._id)
                  }}>
                  Chat
                </Button>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
export default UsersList
