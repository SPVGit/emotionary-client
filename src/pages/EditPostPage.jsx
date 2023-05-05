import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5006";

const EditPostPage = () => {
  const { user } = useContext(AuthContext);

  const [editedPost, setEditedPost] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const post = response.data;
        setEditedPost({
          userId: user._id,
          emotion: post.emotion,
          rating: post.rating,
          description: post.description,
        });
      })
      .catch((error) => console.log(error));
  }, [postId]);

  console.log("initial post", editedPost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((post) => ({ ...post, [name]: value }));
    console.log('handleChange editedPost', editedPost)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      userId: user._id,
      emotion: editedPost.emotion,
      rating: editedPost.rating,
      description: editedPost.description,
    };

    console.log("in submit function reqBody", requestBody);

    axios
      .put(`${API_URL}/posts/edit/${postId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/posts/${postId}`);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          name="emotion"
          value={editedPost.emotion}
          onChange={handleChange}
        >
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

        <select name="rating" value={editedPost.rating} onChange={handleChange}>
          <option value="1">✮ </option>
          <option value="2">✮✮</option>
          <option value="3">✮✮✮</option>
          <option value="4">✮✮✮✮</option>
          <option value="5">✮✮✮✮✮</option>
        </select>
        <textarea
          type="text"
          name="description"
          value={editedPost.description}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPostPage;
