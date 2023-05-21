import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { ListGroup, Button, Card, Container, Accordion, Col, Row } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_URL

const SinglePostPage = (props) => {
  const [post, setPost] = useState(null)
  const [activities, setActivities] = useState([])
  const { postId } = useParams()
  const [isDeleted, setIsDeleted] = useState(false)

  const navigate = useNavigate()

  const storedToken = localStorage.getItem("authToken")

  const getPost = () => {
    axios
      .get(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setIsDeleted(false)
        const singlePost = response.data
        console.log("single post activity", singlePost.activities)
        console.log("response.data", response.data)

        setPost(singlePost)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getPost()
  }, [isDeleted])

  //DELETE POST
  const deletePost = () => {
    axios
      .delete(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("delete response", response.data.message)

        navigate("/posts")
      })
      .catch((err) => console.log(err))
  }

  // DELETE ACTIVITY
  const deleteActivity = (activityId) => {
    console.log("kitty")
    setIsDeleted(true)

    axios
      .delete(`${API_URL}/posts/${postId}/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/posts/${postId}`)
      })
    // .catch((err) => console.log(err))
  }

  return (
    <Container className="w-75 glass p-3">
      <>
        {post && (
          <Row>
            <Card
              className={`${post.emotion} d-flex flex-wrap rounded myglass SinglePostPage text-center p-4`}
              key={post._id}>
              {" "}
              <Col>
                <Card.Header className="label d-flex  justify-content-between">
                  <div className="label"> {post.date} </div>
                  <div className="label">
                    <b> {post.emotion.toUpperCase()} </b>
                  </div>
                  <div className="label">Intensity: {post.rating}</div>
                </Card.Header>
              </Col>
              <Col>
                <Card.Text>{post.description}</Card.Text>
              </Col>
              <Col>
                <Accordion>
                  {post.activities.map(
                    (activity, index) =>
                      !isDeleted && (
                        <Accordion.Item
                          key={activity._id}
                          eventKey={`${index}`}>
                          <Accordion.Header>{activity.title}</Accordion.Header>
                          <Accordion.Body>{activity.level}</Accordion.Body>
                          <Accordion.Body>{activity.successRating}</Accordion.Body>
                          <Accordion.Body>{activity.notes}</Accordion.Body>
                          <Accordion.Body>
                            <Button
                              style={{ color: "red", borderStyle: "none" }}
                              className={`bg-white m-1`}
                              onClick={() => deleteActivity(activity._id)}>
                              Delete
                            </Button>
                            <Link
                              className="m-1"
                              to={`/posts/${postId}/edit/${activity._id}`}>
                              Edit
                            </Link>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                  )}
                </Accordion>
              </Col>
            </Card>
          </Row>
        )}
      </>

      <Container style={{ padding: 20 }}>
        <Col className="d-flex justify-content-center">
          <Button
            className="m-2"
            variant="success"
            onClick={() => navigate(`/addActivity/${postId}`)}>
            Add Activity
          </Button>
          <Button
            className="m-2"
            variant="secondary"
            onClick={() => navigate(`/posts/edit/${postId}`)}>
            Edit Post
          </Button>
          <Button
            className="m-2"
            variant="danger"
            onClick={deletePost}>
            Delete
          </Button>
        </Col>
      </Container>
    </Container>
  )
}

export default SinglePostPage

// <Card style={{ width: '18rem' }}>
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Card.Link href="#">Card Link</Card.Link>
//         <Card.Link href="#">Another Link</Card.Link>
//       </Card.Body>
//     </Card>
