import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react"
import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"

const API_URL = "http://localhost:5006"

const PostsPage = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([])
  console.log('user', user)

  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
  }

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <div>
      {posts.map((post) => 
      (post.user === user._id && 
        <Link
          to={`/posts/${post._id}`}
          key={post._id}>
          <ListGroup>
            <ListGroup.Item>{post.user}</ListGroup.Item>
            <ListGroup.Item>{post.emotion}</ListGroup.Item>
            <ListGroup.Item>{post.rating}</ListGroup.Item>
            <ListGroup.Item>{post.description}</ListGroup.Item>
          </ListGroup>
        </Link>
      ))}
    </div>
  )
}

export default PostsPage
