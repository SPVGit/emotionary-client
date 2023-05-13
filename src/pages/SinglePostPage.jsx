import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
const API_URL = `http://localhost:${process.env.REACT_APP_API_URL}`
const SinglePostPage = (props) => {
  const [post, setPost] = useState(null)
  const [activities, setActivities] = useState([])
  const { postId } = useParams()

  console.log("postId", postId)
  const navigate = useNavigate()

  const storedToken = localStorage.getItem("authToken")

  const getPost = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const singlePost = response.data
        console.log("single post activity", singlePost.activities)
        console.log("response.data", response.data)

        setPost(singlePost)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getPost()
  }, [])

  const deletePost = () => {
    axios
      .delete(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("delete response", response.data.message)
        navigate("/posts")
      })
      .catch((err) => console.log(err))
  }

  const deleteActivity = (activityId) => {
    console.log("kitty")
    //delete from the front end
    setActivities((activities) => {
      const newActivities = activities.filter((activity) => {
        return activity._id !== activityId
      })
      return newActivities
    })

    axios.delete(`${API_URL}/posts/${postId}/${activityId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })

    console.log("monkey")
    navigate("/posts")

    //  .catch((err) => console.log(err))
  }

  return (
    <div className="SinglePostPage">
      {post && (
        <div>
          <p>{post.date}</p>
          <h2>{post.emotion}</h2>
          <p>{post.description}</p>
          <p>{post.rating}</p>
          {post.activities.map((activity) => (
            <ListGroup key={activity._id}>
              <ListGroup.Item>{activity.title}</ListGroup.Item>
              <ListGroup.Item>{activity.level}</ListGroup.Item>
              <ListGroup.Item>{activity.time}</ListGroup.Item>
              <ListGroup.Item>{activity.successRating}</ListGroup.Item>
              <ListGroup.Item>{activity.notes}</ListGroup.Item>
              <button onClick={() => deleteActivity(activity._id)}>Delete</button>
              <Link to={`/posts/${postId}/${activity._id}`}>
                <button>Go to activity</button>
              </Link>
              <Link to={`/posts/${postId}/edit/${activity._id}`}>
                <button>Edit activity</button>
              </Link>
            </ListGroup>
          ))}
        </div>
      )}
      <Link to={`/addActivity/${postId}`}>
        <button>Add Activity</button>
      </Link>

      <Link to={`/posts/edit/${postId}`}>
        <button>Edit Post</button>
      </Link>
      <button onClick={deletePost}>Delete</button>
    </div>
  )
}

export default SinglePostPage
