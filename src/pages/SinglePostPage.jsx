import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { Button, Card, Container, Accordion, Col, Row } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_URL

const SinglePostPage = () => {
  const navigate = useNavigate()
  const { postId } = useParams()

  const [post, setPost] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)

  const storedToken = localStorage.getItem("authToken")

  const getPost = () => {
    axios
      .get(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setIsDeleted(false)
        const singlePost = response.data

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
      .then(() => {
        navigate("/posts")
      })
      .catch((err) => console.log(err))
  }

  // DELETE ACTIVITY
  const deleteActivity = (activityId) => {
    setIsDeleted(true)

    axios
      .delete(`${API_URL}/posts/${postId}/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {})
      .catch((err) => console.log(err))
  }

  return (
    <Container className="w-75 glass p-3">
      <>
        {post && (
          <Row>
            <Card
              className={`${post.emotion} d-flex flex-wrap rounded myglass SinglePostPage text-center p-4`}
              key={post._id}>
              <Col>
                <Card.Header
                  style={{ marginTop: "16px", marginBottom: "16px" }}
                  className="label d-flex  justify-content-start">
                  <div className="label"> {post.date} </div>
                </Card.Header>

                <Card.Header
                  className="label d-flex  justify-content-center"
                  style={{ marginTop: "16px", marginBottom: "16px" }}>
                  <div className="label">
                    <b> {post.emotion.toUpperCase()} </b>
                    <div className="label">Intensity: {post.rating}</div>
                  </div>
                </Card.Header>
              </Col>
              <Col>
                <Card.Text className="d-flex  justify-content-start">Notes: {post.description}</Card.Text>
              </Col>
              <Col>
                <Accordion style={{ marginTop: "16px" }}>
                  {post.activities.map(
                    (activity, index) =>
                      !isDeleted && (
                        <Accordion.Item
                          key={activity._id}
                          eventKey={`${index}`}>
                          <Accordion.Header>{activity.title}</Accordion.Header>
                          <Accordion.Body style={{ marginBottom: -30 }}>
                            <div className="text-start p-2">
                              <div className=""> Difficulty level: {activity.level.charAt(0).toUpperCase() + activity.level.slice(1)}</div> <div> Success: {activity.successRating} </div>
                            </div>
                          </Accordion.Body>
                          <Accordion.Body>
                            <div className="text-start p-2"> Activity note: {activity.notes}</div>
                          </Accordion.Body>
                          <Accordion.Body className="text-end">
                            <Button
                              style={{ color: "red", borderStyle: "none" }}
                              className={`bg-white p-1`}
                              onClick={() => deleteActivity(activity._id)}>
                              Delete
                            </Button>
                            <Link
                              className="p-1"
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
