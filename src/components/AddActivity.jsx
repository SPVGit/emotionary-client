import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5006";

const AddActivity = () => {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const navigate = useNavigate()
  console.log('addActivity postId', postId)
  const [newActivity, setNewActivity] = useState({
    title: "Keep Physically Active",
    level: "easy",
    time: "",
    successRating: "1",
    notes: "",
    // post: postId
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

    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/addactivity/${postId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        console.log("response addActivity", response.data);
        setNewActivity({
          title: "Keep Physically Active",
          level: "easy",
          time: "",
          successRating: "1",
          notes: "",
        });
        navigate("/posts")
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Activity</h3>

      <form onSubmit={handleSubmit}>
        <label>Activity:</label>
        <select
          name="title"
          value={newActivity.title}
          onChange={handleChange}
          required
        >
          <option value="physically-active">Keep Physically Active</option>
          <option value="avoid-alcohol">Avoid alcohol and recreational drugs</option>
          <option value="quit-smoking">Quit smoking</option>
          <option value="quit-drinking">Cut back or quit drinking caffeinated beverages</option>
          <option value="meditation">Do meditation</option>
          <option value="yoga">Do some Yoga</option>
          <option value="sleeping">Make sleeping a priority</option>
          <option value="healthy-food">Eat healthy food</option>
          <option value="socialize">Socialize</option>
          <option value="in-the-moment">Live in the moment as much as you can</option>
        </select>

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
          <option value="1">1 </option>
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
