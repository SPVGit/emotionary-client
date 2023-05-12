import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const API_URL = "http://localhost:5006";

const ActivityPage = () => {
    const [activity, setActivity] = useState(null)
    const {postId, activityId} = useParams();

    const storedToken = localStorage.getItem("authToken");

    console.log('postId ', postId)
    console.log('activityId', activityId)

    const getActivity = () => {
        axios
            .get(`${API_URL}/posts/${postId}/${activityId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                console.log('response.data', response.data)
                setActivity(response.data)

            })
    }

    useEffect(()=> {
        getActivity();
        console.log('activity', activity)
    }, [])


  return (
    <div>
        {activity && 
        <p>{activity.title}</p>
        }
        <p>Activity</p>
    </div>
  )
}

export default ActivityPage