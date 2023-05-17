import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { ListGroup, Button, Card, Container} from "react-bootstrap"


const API_URL = process.env.REACT_APP_API_URL

const SinglePostPage = (props) => {
  const [post, setPost] = useState(null)
  const [activities, setActivities] = useState([])
  const { postId } = useParams()

  const navigate = useNavigate()

  const storedToken = localStorage.getItem("authToken")

  const getPost = () => {
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
    <Container className="bg-white">
      <Card className="SinglePostPage text-center p-3 glass-dark col-3">
        {post && (
          <div key={post._id}>
            <Card.Header>{post.date}</Card.Header>
            <Card.Title>{post.emotion.toUpperCase()}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Card.Text>{post.rating}</Card.Text>
            {post.activities.map((activity) => (
              <Container
                key={activity._id}
                className="d-flex justify-content-center m-2">
                <Card style={{ width: "20rem" }}>
                  <ListGroup.Item>{activity.title}</ListGroup.Item>
                  <ListGroup.Item>{activity.level}</ListGroup.Item>
                  <ListGroup.Item>{activity.time}</ListGroup.Item>
                  <ListGroup.Item>{activity.successRating}</ListGroup.Item>
                  <ListGroup.Item>{activity.notes}</ListGroup.Item>
                  <Container className="d-flex flex-row">
                    <p
                      style={{ color: "red" }}
                      className=" m-1"
                      onClick={() => deleteActivity(activity._id)}>
                      Delete
                    </p>
                    <Link
                      className="m-1"
                      to={`/posts/${postId}/edit/${activity._id}`}>
                      Edit
                    </Link>
                  </Container>
                </Card>
              </Container>
            ))}
          </div>
        )}
        <Container>
          <Link to={`/addActivity/${postId}`}>
            <Button className="dark m-1">Add Activity</Button>
          </Link>

          <Link to={`/posts/edit/${postId}`}>
            <Button className="dark m-1">Edit Post</Button>
          </Link>

          <Link>
            <Button
              style={{ backgroundColor: "red", borderColor: "red" }}
              onClick={deletePost}
              className="m-1">
              Delete
            </Button>
          </Link>
        </Container>
      </Card>
    </Container>
  )
}

export default SinglePostPage

// <Card style={{ width: '18rem' }}>
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Card.Link href="#">Card Link</Card.Link>
//         <Card.Link href="#">Another Link</Card.Link>
//       </Card.Body>
//     </Card>
