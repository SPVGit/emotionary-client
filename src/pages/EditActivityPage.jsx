import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

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
    <div>
      <h3>Edit Activity</h3>

      <form onSubmit={handleSubmit}>
        <label>Activity:</label>

        <label>Level:</label>
        <select
          style={{ color: "grey" }}
          name="level"
          value={updatedActivity.level}
          onChange={handleChange}
          required>
          <option value="easy"> easy </option>
          <option value="moderate">moderate</option>
          <option value="difficult">difficult</option>
        </select>

        <label>How successfully you applied the activity?</label>
        <select
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
        </select>

        <label>Your impressions?</label>
        <textarea
          style={{ color: "grey" }}
          type="text"
          name="notes"
          value={updatedActivity.notes}
          onChange={handleChange}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditActivityPage
