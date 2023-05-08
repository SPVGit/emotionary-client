import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import Happy from "./emotions/Happy";
import Sad from "./emotions/Sad"
import Angry from "./emotions/Angry";
import Anxious from "./emotions/Anxious";
import Calm from "./emotions/Calm";
import Depressed from "./emotions/Depressed";
import Embarrassed from "./emotions/Embarrassed";
import Excited from "./emotions/Excited";
import InLove from "./emotions/InLove";
import Satisfied from "./emotions/Satisfied";

const API_URL = "http://localhost:5006";

const AddActivity = () => {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const navigate = useNavigate()
  const [emotion, setEmotion] = useState('')
  const storedToken = localStorage.getItem("authToken");
  console.log('addActivity postId', postId)
  const [newActivity, setNewActivity] = useState({
    title: "",
    level: "easy",
    time: "",
    successRating: "1",
    notes: "",
    //post: postId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((activity) => ({ ...activity, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title: newActivity.title,
      level: newActivity.level,
      time: newActivity.time,
      successRating: newActivity.successRating,
      notes: newActivity.notes,
    };

    console.log("requestBody addActivity", requestBody);

    axios
      .post(`${API_URL}/addactivity/${postId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        console.log("response addActivity", response.data);
        setNewActivity({
          title: "",
          level: "easy",
          time: "",
          successRating: "1",
          notes: "",
        });
        navigate("/posts")
      })
      .catch((error) => console.log(error));
  };

  const getEmotion = () => {
    axios
    .get(`${API_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
      console.log("response Emotion AddActivity", response.data)
      setEmotion(response.data.emotion)
    })
  }

  useEffect(() => {
    getEmotion();
  }, [])

  //A function we pass as props to child component, so that we can get the activity title afterwards
  const pullActivityTitle = (data) => {
    console.log('from child component', data)
  }
  return (
    <div>
      <h3>Add Activity</h3>

      <form onSubmit={handleSubmit}>
        <label>Activity:</label>
      {emotion === "happy" && <Happy handleChange = {handleChange} />}
      {emotion === "sad" && <Sad handleChange = {handleChange} />}
      {emotion === "angry" && <Angry handleChange = {handleChange} />}
      {emotion === "anxious" && <Anxious handleChange = {handleChange} />}
      {emotion === "calm" && <Calm handleChange = {handleChange} />}
      {emotion === "depressed" && <Depressed handleChange = {handleChange} />}
      {emotion === "embarrassed" && <Embarrassed handleChange = {handleChange} />}
      {emotion === "excited" && <Excited handleChange = {handleChange} />}
      {emotion === "in-love" && <InLove handleChange = {handleChange} />}
      {emotion === "satisfied" && <Satisfied handleChange = {handleChange} />}
      
        <label>Level:</label>
        <select
          name="level"
          value={newActivity.level}
          onChange={handleChange}
          required
        >
          <option value="easy"> easy </option>
          <option value="moderate">moderate</option>
          <option value="difficult">difficult</option>
        </select>

        <label>How successfully you applied the activity?</label>
        <select
          name="successRating"
          value={newActivity.successRating}
          onChange={handleChange}
          required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label>Your impressions?</label>
        <textarea
          type="text"
          name="notes"
          value={newActivity.notes}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddActivity;
