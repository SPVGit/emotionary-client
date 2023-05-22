import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { Button, Card, Container, Accordion, Col, Row } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_URL

const SinglePostPage = () => {

  const [post, setPost] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)

  const navigate = useNavigate()
  const { postId } = useParams()

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
    setIsDeleted(true)

    axios
      .delete(`${API_URL}/posts/${postId}/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/posts/${postId}`)
      })
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
              {" "}
              <Col>
                <Card.Header
                  style={{ marginTop: "16px", marginBottom: "16px" }}
                  className="label d-flex  justify-content-between">
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
                <Accordion style={{ marginTop: "16px" }}>
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
