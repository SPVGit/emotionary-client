
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useState, useEffect } from "react"
import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import { useParams, useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:5006"

function PostsByDate() {

    const { user, isLoggedIn } = useContext(AuthContext)
    const [post, setPost] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const { postId } = useParams();

    const getPost = () => {
        const storedToken = localStorage.getItem("authToken")
        axios
            .get(`${API_URL}/postsbydate/${postId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                let thePost = response.data
                setPost(thePost)
                
                const storedToken = localStorage.getItem("authToken")
                axios
                    .get(`${API_URL}/posts`, {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    })
                    .then((response) => {
                        setAllPosts(response.data.filter((data) => data.user===user._id && data.date===thePost.date))
                    })
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <>
            <div className="over-flow ">
                <h2>View All Posts On {post.date}</h2>
                {allPosts.map(
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

        </>
    )
}

export default PostsByDate