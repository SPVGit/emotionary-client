import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const API_URL = `http://localhost:${process.env.REACT_APP_API_URL}`

const EditActivityPage = () => {
  const { postId, activityId } = useParams()
  const navigate = useNavigate()
  const storedToken = localStorage.getItem("authToken")
  console.log("editActivity Id", activityId)
  const [updatedActivity, setUpdatedActivity] = useState({})

  // Create useEffect to editActivity

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/${postId}/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const activity = response.data
        setUpdatedActivity({
          title: activity.title,
          level: activity.level,
          time: activity.time,
          successRating: activity.successRating,
          notes: activity.notes,
          post: postId,
        })
      })
      .catch((error) => console.log(error))
  }, [activityId])

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = {
      title: updatedActivity.title,
      level: updatedActivity.level,
      time: updatedActivity.time,
      successRating: updatedActivity.successRating,
      notes: updatedActivity.notes,
      post: postId,
    }

    console.log("editActivity req.body", requestBody)

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
    console.log("handleChange updatedActivity", updatedActivity)
  }

  return (
    <Container className="p-2s">
      <Form
        style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }}
        onSubmit={handleSubmit}
        className="mb-3 mt-4">
        <h3>Edit Activity</h3>

        <Form.Group controlId="validationCustom01">
          <Form.Label>Activity:</Form.Label>
          <Form.Group>
            <Form.Label>Level:</Form.Label>
            <Form.Select
              name="level"
              value={updatedActivity.level}
              onChange={handleChange}
              required>
              <option value="easy"> easy </option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">How successfully you applied the activity?</Form.Label>
            <Form.Select
              name="successRating"
              value={updatedActivity.successRating}
              onChange={handleChange}
              required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Your impressions?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              name="notes"
              value={updatedActivity.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Group>
        <Button
          className="mt-4"
          type="submit">
          Update
        </Button>
      </Form>
    </Container>
  )
}

export default EditActivityPage

// <Container className="mb-3">
// <Form
//   style={{ padding: "40px", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }}
//   onSubmit={handleSubmit}>
//   <h3>Add Emotion</h3>
//   <Row className="mb-3 mt-3">
//     <Form.Group
//       as={Col}
//       md="4"
//       controlId="validationCustom01">
//       <Form.Label>Date</Form.Label>
//       <Form.Control
//         required
//         type="date"
//         name="date"
//         value={newPost.date}
//         onChange={handleChange}
//       />
//       <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group
//       as={Col}
//       md="4"
//       controlId="validationCustom02">
//       <Form.Label>Emotion:</Form.Label>
//       <Form.Select
//         name="emotion"
//         value={newPost.emotion}
//         onChange={handleChange}
//         required>
//         <option value="happy">Happy</option>
//         <option value="in-love">In Love</option>
//         <option value="excited">Excited</option>
//         <option value="satisfied">Satisfied</option>
//         <option value="calm">Calm</option>
//         <option value="sad">Sad</option>
//         <option value="anxious">Anxious</option>
//         <option value="hurt">Hurt</option>
//         <option value="embarrassed">Embarrassed</option>
//         <option value="depressed">Depressed</option>
//         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//       </Form.Select>
//     </Form.Group>

//     <Form.Group
//       as={Col}
//       md="4"
//       controlId="validationCustom03">
//       <Form.Label>Emotion Intensity:</Form.Label>
//       <Form.Select
//         name="rating"
//         value={newPost.rating}
//         onChange={handleChange}
//         required>
//         <option value="1">✮ </option>
//         <option value="2">✮✮</option>
//         <option value="3">✮✮✮</option>
//         <option value="4">✮✮✮✮</option>
//         <option value="5">✮✮✮✮✮</option>
//         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//       </Form.Select>
//     </Form.Group>

//     <Form.Group
//       className="mt-4"
//       as={Col}
//       controlId="validationCustom04">
//       <Form.Label>What made you feel that way?</Form.Label>
//       <Form.Control
//         as="textarea"
//         rows={3}
//         type="text"
//         name="description"
//         value={newPost.description}
//         onChange={handleChange}
//         style={{ height: "40vh" }}
//       />
//     </Form.Group>
//   </Row>

//   <Button
//     className="shadow"
//     variant="dark"
//     type="submit">
//     Submit
//   </Button>
// </Form>
// </Container>
