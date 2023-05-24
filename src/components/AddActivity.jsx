import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Happy from "./emotions/Happy"
import Sad from "./emotions/Sad"
import Angry from "./emotions/Angry"
import Anxious from "./emotions/Anxious"
import Calm from "./emotions/Calm"
import Depressed from "./emotions/Depressed"
import Embarrassed from "./emotions/Embarrassed"
import Excited from "./emotions/Excited"
import InLove from "./emotions/InLove"
import Satisfied from "./emotions/Satisfied"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"

/* This component is imported into the activity form page. Activities can be added to help prolong positive emotions or 
get rid of negative emotions */

const API_URL = process.env.REACT_APP_API_URL

const AddActivity = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState(undefined)
  const [emotion, setEmotion] = useState("")
  const [newActivity, setNewActivity] = useState({
    title: "",
    level: "easy",
    time: "",
    successRating: "1",
    notes: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewActivity((activity) => ({ ...activity, [name]: value }))
  }

  const storedToken = localStorage.getItem("authToken")

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = {
      title: newActivity.title,
      level: newActivity.level,
      time: newActivity.time,
      successRating: newActivity.successRating,
      notes: newActivity.notes,
    }

    axios
      .post(`${API_URL}/addactivity/${postId}`, requestBody, { //posts the new activity added to the backend
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setNewActivity({
          title: "",
          level: "easy",
          time: "",
          successRating: "1",
          notes: "",
        })


        navigate(`/posts/${postId}`) // On adding a new activity, navigate back to the single post page on which the activities added will be listed under the emotion post

      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  const getEmotion = () => {
    axios
      .get(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },  //gets the single emotion post by id so that an activity can be added to that specific emotion post.
      })
      .then((response) => {
      
        setEmotion(response.data.emotion)
      })
  }

  useEffect(() => {
    getEmotion()
  }, [])

  return (
    <Container className="mb-3">
      <Form
        style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }}
        onSubmit={handleSubmit}>
        <h3>Add Activity</h3>

        <Row>
          <Form.Group
            as={Col}
            md="4">
            <Form.Label className="label">Activity:</Form.Label>
            {emotion === "happy" && <Happy handleChange={handleChange} />}
            {emotion === "sad" && <Sad handleChange={handleChange} />}
            {emotion === "angry" && <Angry handleChange={handleChange} />}
            {emotion === "anxious" && <Anxious handleChange={handleChange} />}
            {emotion === "calm" && <Calm handleChange={handleChange} />}
            {emotion === "depressed" && <Depressed handleChange={handleChange} />}
            {emotion === "embarrassed" && <Embarrassed handleChange={handleChange} />}
            {emotion === "excited" && <Excited handleChange={handleChange} />}
            {emotion === "in-love" && <InLove handleChange={handleChange} />}
            {emotion === "satisfied" && <Satisfied handleChange={handleChange} />}
          </Form.Group>

          <Form.Group
            as={Col}
            md="4">
            <Form.Label className="label">Level:</Form.Label>
            <Form.Select
              name="level"
              value={newActivity.level}
              onChange={handleChange}>
              <option value="easy"> easy </option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Col}
            md="4">
            <Form.Label className="label">Satisfaction:</Form.Label>
            <Form.Select
              name="successRating"
              value={newActivity.successRating}
              onChange={handleChange}
              required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Label className="label mt-3">Your impressions?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          name="notes"
          value={newActivity.notes}
          onChange={handleChange}
          style={{ height: "40vh" }}
        />

        <Button
          className="shadow mt-3"
          variant="dark"
          type="submit">
          Add
        </Button>
      </Form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Container>
  )
}

export default AddActivity
