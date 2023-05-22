import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const API_URL = process.env.REACT_APP_API_URL

console.log(process.env.REACT_APP_API_URL)

const AddPost = () => {
  const { user } = useContext(AuthContext)
  const myDay = new Date()

  const [newPost, setNewPost] = useState({
    userId: user._id,
    date: "",
    emotion: "happy",
    rating: "1",
    description: "",
  })

  console.log("Date now", myDay.getDate())
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPost((post) => ({ ...post, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = {
      userId: newPost.userId,
      date: newPost.date,
      emotion: newPost.emotion,
      rating: newPost.rating,
      description: newPost.description,
    }

    console.log("requestBody", requestBody)

    const storedToken = localStorage.getItem("authToken")
    axios
      .post(`${API_URL}/addpost`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        console.log("response", response)
        setNewPost({
          userId: user._id,
          date: "",
          emotion: "happy",
          rating: "1",
          description: "",
        })
        navigate("/posts")
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container className="mb-3">
      <Form
        style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }}
        onSubmit={handleSubmit}>
        <h3>Add Emotion</h3>
        <Row className="mb-3 mt-3">
          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustom01">
            <Form.Label className="label ">Date</Form.Label>
            <Form.Control
              wrequired
              type="date"
              name="date"
              value={newPost.date}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustom02">
            <Form.Label className="label ">Emotion:</Form.Label>
            <Form.Select
              name="emotion"
              value={newPost.emotion}
              onChange={handleChange}
              required>
              <option value="happy">Happy</option>
              <option value="in-love">In Love</option>
              <option value="excited">Excited</option>
              <option value="satisfied">Satisfied</option>
              <option value="calm">Calm</option>
              <option value="sad">Sad</option>
              <option value="anxious">Anxious</option>
              <option value="angry">Angry</option>
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
              value={newPost.rating}
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
              value={newPost.description}
              onChange={handleChange}
              style={{ height: "40vh" }}
            />
          </Form.Group>
        </Row>

        <Button
          className=" shadow"
          variant="dark"
          type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default AddPost

