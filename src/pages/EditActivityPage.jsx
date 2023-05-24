import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const API_URL = process.env.REACT_APP_API_URL

const EditActivityPage = () => {
  
  const { postId, activityId } = useParams()
  const navigate = useNavigate()
  const storedToken = localStorage.getItem("authToken")
  const [updatedActivity, setUpdatedActivity] = useState({})


  useEffect(() => {
    axios
      .get(`${API_URL}/posts/${postId}/${activityId}`, { //gets activity by its id to prefill the edit form
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const activity = response.data
        setUpdatedActivity({
          title: activity.title,
          level: activity.level,
          successRating: activity.successRating,
          notes: activity.notes,
          post: postId,
        })
      })
      .catch((error) => console.log(error))
  }, [activityId])

  const handleSubmit = (e) => { // on submit the edited activity is sent to the database
    e.preventDefault()

    const requestBody = {
      title: updatedActivity.title,
      level: updatedActivity.level,
      successRating: updatedActivity.successRating,
      notes: updatedActivity.notes,
      post: postId,
    }

    axios
      .put(`${API_URL}/posts/${postId}/edit/${activityId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/posts/${postId}`)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedActivity((activity) => ({ ...activity, [name]: value }))
  }

  return (
    <Container>
      <Form
        style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }}
        onSubmit={handleSubmit}>
        <h3>Edit Activity</h3>
        <h5>"{updatedActivity.title}"</h5>
        <Row className="mb-3 mt-3">
          <Form.Group
            as={Col}
            md="6">
            <Form.Label className="label">Level:</Form.Label>
            <Form.Select
              style={{ color: "grey" }}
              name="level"
              value={updatedActivity.level}
              onChange={handleChange}
              required>
              <option value="easy"> easy </option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6">
            <Form.Label className="label">Activity success</Form.Label>
            <Form.Select
              className="mb-2"
              style={{ color: "grey" }}
              name="successRating"
              value={updatedActivity.successRating}
              onChange={handleChange}
              required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Container}
            md="4">
            <Form.Label className="label">Your impressions?</Form.Label>
            <Form.Control
              className="mt-2"
              as="textarea"
              rows={3}
              style={{ height: "40vh" }}
              type="text"
              name="notes"
              value={updatedActivity.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Button
          className="shadow"
          variant="dark"
          type="submit">
          Update
        </Button>
      </Form>
    </Container>
  )
}

export default EditActivityPage
