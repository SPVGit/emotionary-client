import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useState, useEffect } from "react"
import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import BottomNavbar from "../components/bottomNavbar"

const API_URL = "http://localhost:5006"

const PostsPage = () => {
  const { user, isLoggedIn } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  console.log("user", user)

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
      <h2>Hello {user.name}</h2>
      {posts.map(
        (post) =>
          post.user === user._id && (
            <Link
              to={`/posts/${post._id}`}
              key={post._id}>
              <ListGroup style={{ padding: 8 }}>
                <ListGroup.Item
                  className={post.emotion}
                  style={{ height: 80 }}>
                  {post.emotion}
                </ListGroup.Item>
              </ListGroup>
            </Link>
          )
      )}
      <BottomNavbar />
      <Link to={"/addpost"}>Add Post</Link>
    </div>
  )
}

export default PostsPage
