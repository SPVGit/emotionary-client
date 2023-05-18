import { AuthContext } from "../context/auth.context"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import BottomNavbar from "../components/bottomNavbar"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const API_URL = process.env.REACT_APP_API_URL

const PostsPage = () => {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [oldest, setOldest] = useState(false)
  const [emotion, setEmotion] = useState("")

  /*  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
  } */
  const storedToken = localStorage.getItem("authToken")

  const latestToOldest = (data) => {
    const sortedByDate = [...data].sort(function (a, b) {
      const [aYear, aMonth, aDay] = a.date.split("-")
      const [bYear, bMonth, bDay] = b.date.split("-")
      const dateA = new Date(aYear, aMonth - 1, aDay)
      const dateB = new Date(bYear, bMonth - 1, bDay)
      return dateB.getTime() - dateA.getTime()
    })
    setPosts(sortedByDate)
  }

  const sortByDate = () => {
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const sortedByDate = [...response.data].sort(function (a, b) {
          const [aYear, aMonth, aDay] = a.date.split("-")
          const [bYear, bMonth, bDay] = b.date.split("-")
          const dateA = new Date(aYear, aMonth - 1, aDay)
          const dateB = new Date(bYear, bMonth - 1, bDay)

          if (oldest === false) {
            setOldest(true)
            return dateB.getTime() - dateA.getTime()
          } else {
            setOldest(false)
            return dateA.getTime() - dateB.getTime()
          }
        })
        setPosts(sortedByDate)
      })
      .catch((err) => console.log(err))
  }

  const filterByEmotion = (e) => {
    console.log("e.target.value", e.target.value)
    setEmotion(e.target.value)
    console.log("emotion", emotion)
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (e.target.value === "all") {
          latestToOldest(response.data)
        } else {
          console.log("emotion", emotion)
          /*       const filteredByEmotionArr = response.data.filter(
            (post) => post.emotion === e.target.value
          ); */

          latestToOldest(response.data.filter((post) => post.emotion === e.target.value))
        }
      })
  }

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    sortByDate()
  }, [])

  return (
    <Container className="text-center ">
      <Row className="align-items-center  p-4">
        <Col className="name d-flex m -2 text-white justify-content-start">Hello {user.name}</Col>

        <Col>
          <Form.Select
            name="emotion"
            value={emotion}
            onChange={filterByEmotion}>
            Filter by emotion
            <option>Select one</option>
            <option value="all">All</option>
            <option value="happy">Happy</option>
            <option value="in-love">In Love</option>
            <option value="excited">Excited</option>
            <option value="satisfied">Satisfied</option>
            <option value="calm">Calm</option>
            <option value="sad">Sad</option>
            <option value="anxious">Anxious</option>
            <option value="hurt">Hurt</option>
            <option value="embarrassed">Embarrassed</option>
            <option value="depressed">Depressed</option>
          </Form.Select>
        </Col>
        <Col>
          <Container className="align-items-center d-flex justify-content-end ">
            <Link
              className="p-2"
              onClick={sortByDate}
              variant="white">
              <img
                className="rounded"
                src="sort-up.svg"
                alt="sort-image"
                style={{ width: "30px", height: "30px", backgroundColor: "white" }}
              />
            </Link>
            <Link
              to={`/profile/${user._id}`}
              className="p-1">
              <img
                className="rounded"
                style={{ backgroundColor: "white" }}
                src="person-fill.svg"
                alt="person-icon"
                width="30px"
                height="30px"
              />
            </Link>
            <Link
              to="/stats"
              className="p-2">
              <img
                className="rounded"
                style={{ backgroundColor: "white" }}
                src="clipboard-data-fill.svg"
                alt="clipboard-icon"
                width="30px"
                height="30px"
              />
            </Link>
          </Container>
        </Col>
      </Row>

      <Container>
        <Row className="d-flex flex-row">
          {posts.map(
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
                        <Card.Header>
                          <span> {post.date}</span>
                        </Card.Header>
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
      <Col className="d-flex justify-content-center">
        <BottomNavbar />
      </Col>
    </Container>
  )
}

export default PostsPage
