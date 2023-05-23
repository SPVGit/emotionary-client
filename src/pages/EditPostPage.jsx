import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/auth.context"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"

const API_URL = process.env.REACT_APP_API_URL

const EditPostPage = () => {
  const { user } = useContext(AuthContext)

  const [editedPost, setEditedPost] = useState({})
  const { postId } = useParams()
  const navigate = useNavigate()

  const storedToken = localStorage.getItem("authToken")

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const post = response.data
        setEditedPost({
          userId: user._id,
          emotion: post.emotion,
          date: post.date,
          rating: post.rating,
          description: post.description,
        })
      })
      .catch((error) => console.log(error))
  }, [postId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedPost((post) => ({ ...post, [name]: value }))

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = {
      userId: user._id,
      emotion: editedPost.emotion,
      date: editedPost.date,
      rating: editedPost.rating,
      description: editedPost.description,
    }

    axios
      .put(`${API_URL}/posts/edit/${postId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/posts/${postId}`)
      })
  }

  return (
    <Container className="mb-3">
      <Form
        style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }}
        onSubmit={handleSubmit}>
        <h3>Edit Emotion</h3>

        <Row className="mb-3 mt-3">
          <Form.Group
            as={Col}
            md="4">
            <Form.Label className="label ">Date</Form.Label>
            <Form.Control
              required
              type="date"
              name="date"
              value={editedPost.date}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md="4">
            <Form.Label className="label ">Emotion:</Form.Label>
            <Form.Select
              name="emotion"
              value={editedPost.emotion}
              onChange={handleChange}
              required>
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustom03">
            <Form.Label className="label ">Emotion Intensity:</Form.Label>
            <Form.Select
              name="rating"
              value={editedPost.rating}
              onChange={handleChange}
              required>
              <option value="1">✮ </option>
              <option value="2">✮✮</option>
              <option value="3">✮✮✮</option>
              <option value="4">✮✮✮✮</option>
              <option value="5">✮✮✮✮✮</option>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="mt-4"
            as={Col}
            controlId="validationCustom04">
            <Form.Label className="label ">What made you feel that way?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              name="description"
              value={editedPost.description}
              onChange={handleChange}
              style={{ height: "40vh" }}
            />
          </Form.Group>
        </Row>

        <Button
          className="  shadow"
          variant="dark"
          type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default EditPostPage
