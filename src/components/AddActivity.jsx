import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

const API_URL = "http://localhost:5006"

const AddActivity = () => {
  const { user } = useContext(AuthContext)
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [newActivity, setNewActivity] = useState({
    title: "Keep Physically Active",
    level: "easy",
    time: "",
    successRating: "1",
    notes: "",
    // post: postId
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewActivity((activity) => ({ ...activity, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = {
      title: newActivity.title,
      level: newActivity.level,
      time: newActivity.time,
      successRating: newActivity.successRating,
      notes: newActivity.notes,
    }

    console.log("requestBody", requestBody)

    const storedToken = localStorage.getItem("authToken")
    axios
      .post(`${API_URL}/api/addactivity`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        console.log("response", response)
        setNewActivity({
          userId: user._id,
          emotion: "happy",
          rating: "1",
          description: "",
        })
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <h3>Add Emotion</h3>

      <form onSubmit={handleSubmit}>
        <label>Emotion:</label>
        <select
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
          <option value="hurt">Hurt</option>
          <option value="embarrassed">Embarrassed</option>
          <option value="depressed">Depressed</option>
        </select>

        <label>Emotion Intensity:</label>
        <select
          name="rating"
          value={newPost.rating}
          onChange={handleChange}
          required>
          <option value="1">✮ </option>
          <option value="2">✮✮</option>
          <option value="3">✮✮✮</option>
          <option value="4">✮✮✮✮</option>
          <option value="5">🫠🫠🫠🫠🫠</option>
        </select>

        <label>What made you feel that way?</label>
        <textarea
          type="text"
          name="description"
          value={newPost.description}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddPost
