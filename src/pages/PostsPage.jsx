import { useState, useEffect } from "react";
import axios from "axios";
import AddPostPage from "../components/AddPost";

const API_URL = "http://localhost:5005";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <AddPostPage getAllPosts ={getAllPosts}/>
    </div>
  );
};

export default PostsPage;
