import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import BottomNavbar from "../components/bottomNavbar";

const API_URL = "http://localhost:5005";

const PostsPage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [oldest, setOldest] = useState(false);
  const [emotion, setEmotion] = useState("");

  /*  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
  } */
  const storedToken = localStorage.getItem("authToken");

  const latestToOldest = (data) => {
const sortedByDate = [...data].sort(function (a, b) {
  const [aYear, aMonth, aDay] = a.date.split("-");
  const [bYear, bMonth, bDay] = b.date.split("-");
  const dateA = new Date(aYear, aMonth - 1, aDay);
  const dateB = new Date(bYear, bMonth - 1, bDay);
    return dateB.getTime() - dateA.getTime();
  
});
setPosts(sortedByDate);
  }

  const sortByDate = () => {
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const sortedByDate = [...response.data].sort(function (a, b) {
          const [aYear, aMonth, aDay] = a.date.split("-");
          const [bYear, bMonth, bDay] = b.date.split("-");
          const dateA = new Date(aYear, aMonth - 1, aDay);
          const dateB = new Date(bYear, bMonth - 1, bDay);

          if (oldest === false) {
            setOldest(true);
            return dateB.getTime() - dateA.getTime();
          } else {
            setOldest(false);
            return dateA.getTime() - dateB.getTime();
          }
        });
        setPosts(sortedByDate);
      })
      .catch((err) => console.log(err));
  };

  const filterByEmotion = (e) => {
    console.log("e.target.value", e.target.value);
    setEmotion(e.target.value);
    console.log("emotion", emotion);
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (e.target.value === "all") {
          latestToOldest(response.data)
        } else {
          console.log("emotion", emotion);
   /*       const filteredByEmotionArr = response.data.filter(
            (post) => post.emotion === e.target.value
          ); */
          
          latestToOldest(response.data.filter(
            (post) => post.emotion === e.target.value
          ))
        }
      });
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    sortByDate();
  }, []);

  return (
    <>
      <button onClick={sortByDate} style={{ backgroundColor: "grey" }}>
        Sort by date
      </button>
      <select
        name="emotion"
        value={emotion}
        onChange={filterByEmotion}
        style={{ backgroundColor: "grey" }}
      >
        Filter by emotion
        <option>Select one</option>
        <option value="all">All</option>
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
              <Link to={`/posts/${post._id}`} key={post._id}>
                <ListGroup style={{ padding: 8 }}>
                  <ListGroup.Item
                    className={post.emotion}
                    style={{ height: 80 }}
                  >
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
  );
};

export default PostsPage;
