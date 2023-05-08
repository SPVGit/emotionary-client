import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useState, useEffect } from "react"
import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import BottomNavbar from "../components/bottomNavbar"
import { Button } from "react-bootstrap"

const API_URL = "http://localhost:5006"

const PostsPage = () => {
  const { user, isLoggedIn } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [oldest, setOldest] = useState(false)
  // console.log("user", user)

  /*  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
  } */
  const sortByDate = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const sortedByDate = [...response.data].sort(function (a, b) {
          const [aYear, aMonth, aDay] = a.date.split("-")
          const [bYear, bMonth, bDay] = b.date.split("-")
          const dateA = new Date(aYear, aMonth - 1, aDay)
          const dateB = new Date(bYear, bMonth - 1, bDay)
          console.log("dateA", dateA)
          console.log("dateB", dateB)

          if (oldest === false) {
            setOldest(true)
            console.log("if newest", oldest)
            return dateB.getTime() - dateA.getTime()
          } else {
            setOldest(false)
            console.log("else newest", oldest)
            return dateA.getTime() - dateB.getTime()
          }
        })
        setPosts(sortedByDate)
        console.log("sortedByDate", sortedByDate)
      })
      .catch((err) => console.log(err))
  }
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    sortByDate()
  }, [])

  return (
    <>
      <Button
        onClick={sortByDate}
        style={{ backgroundColor: "grey" }}>
        Sort by date
      </Button>
      <span className="d-flex p-4 justify-content-between">
        <h2 className="h2">Hello {user.name}</h2>
        <img
          src="clipboard-data-fill.svg"
          alt="clipboard-icon"
          width="30px"
          height="30px"
        />
      </span>
      <div className="over-flow ">
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
                    <span>{post.date}</span>
                    <h2>{post.emotion}</h2>
                  </ListGroup.Item>
                </ListGroup>
              </Link>
            )
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <BottomNavbar />
    </>
  )
}

export default PostsPage
