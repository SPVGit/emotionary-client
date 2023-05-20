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

const API_URL = process.env.REACT_APP_API_URL

function UsersList() {
  const { therapist } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const storedToken = localStorage.getItem("authTherapistToken")

  console.log(storedToken)

  const getUsers = () => {
    //const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const allUsers = response.data
        console.log("response.data", response.data)

        setUsers(allUsers)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUsers()
  }, [])

  // CHAT button //
  const handleChatClick = (chatUserId) => {
    //  const storedToken = localStorage.getItem("authToken");
    /*   if(!user){
          navigate('/signin')
          return; 
      }*/
    //   else {
    let data = {
      participants: [chatUserId, therapist._id],
    }
    axios.post(`${API_URL}/conversation`, data, { headers: { Authorization: `Bearer ${storedToken}` } }).then((response) => {
      navigate(`/therchat/${response.data._id}`)
    })

    //  }
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
                    <h5>{chatUser.name.toUpperCase()}</h5>
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

// <Container>
// <Row className="d-flex flex-row">
//   {posts.map(
//     (post) =>
//       post.user === user._id && (
//         <Col
//           style={{ minWidth: "320px" }}
//           key={post._id}>
//           <Link
//             style={{ textDecoration: "none", color: "black" }}
//             to={`/posts/${post._id}`}>
//             <Card
//               className={post.emotion}
//               style={{ padding: 16, margin: 8 }}>
//               <ListGroup>
//                 <Card.Header>
//                   <span> {post.date}</span>
//                 </Card.Header>
//                 <Card.Title>
//                   <h2>{post.emotion.toUpperCase()}</h2>
//                 </Card.Title>
//               </ListGroup>
//             </Card>
//           </Link>
//         </Col>
