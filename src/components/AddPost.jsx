import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

const AddPost = (props) => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  const [newPost, setNewPost] = useState({
    emotion: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((post) => ({ ...post, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      emotion: newPost.emotion,
      title: newPost.title,
      description: newPost.description,
    };

    console.log("requestBody", requestBody)

    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/api/posts`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        console.log('response', response)
        setNewPost({
          emotion: "",
          title: "",
          description: "",
        });
      props.getAllPosts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Emotion</h3>

      <form onSubmit={handleSubmit}>
        <label>Emotion:</label>
        <select name="emotion" value={newPost.emotion} onChange={handleChange}>
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

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={newPost.description}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;
