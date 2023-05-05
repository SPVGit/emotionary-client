import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5006";

const SinglePostPage = (props) => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  console.log("postId", postId);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken")

  const getPost = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const singlePost = response.data;
        console.log("response.data", response.data);
        setPost(singlePost);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPost();
  }, []);

  const deletePost = () => {
    axios
      .delete(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/posts");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="SinglePostPage">
      {post && (
        <div>
          <h2>{post.emotion}</h2>
          <p>{post.description}</p>
          <p>{post.rating}</p>
        </div>
      )}

      <button onClick={deletePost}>Delete</button>
    </div>
  );
};

export default SinglePostPage;
