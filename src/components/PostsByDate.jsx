import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import BottomNavbar from "../components/bottomNavbar"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const API_URL = process.env.REACT_APP_API_URL

function PostsByDate() {
  const { user } = useContext(AuthContext)
  const [post, setPost] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const { postId } = useParams()

  const getPost = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/postsbydate/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        let thePost = response.data
        setPost(thePost)

        const storedToken = localStorage.getItem("authToken")
        axios
          .get(`${API_URL}/posts`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            setAllPosts(response.data.filter((data) => data.user === user._id && data.date === thePost.date))
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <Container className="text-center "
    style={{ height: "120vh" }}>
       <Container>
        <Row className="d-flex flex-row">
  
        <h3>View All Posts On: </h3>
        <h4 style={{color:'white'}}>{post.date}</h4>

        {allPosts.map(
            (post) =>
              post.user === user._id && (
                <Col
                  style={{ minWidth: "320px" }}
                  key={post._id}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/posts/${post._id}`}>
                    <Card
                      className={post.emotion}
                      style={{ padding: 16, margin: 8 }}>
                      <ListGroup>
                        <Card.Title>
                          <h2>{post.emotion.toUpperCase()}</h2>
                        </Card.Title>
                      </ListGroup>
                    </Card>
                  </Link>
                </Col>
              )
          )}
   
      
      </Row>
      </Container>
      <div style={{ height: "80px" }}></div>

      <Col className="d-flex justify-content-center">
        <BottomNavbar />
      </Col>
    </Container >
  )
}

export default PostsByDate
