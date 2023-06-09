import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

const ActivityPage = () => {
  const [activity, setActivity] = useState(null)
  const { postId, activityId } = useParams()

  const storedToken = localStorage.getItem("authToken")

  const getActivity = () => { //gets all activites to display on single emotions post page
    axios
      .get(`${API_URL}/posts/${postId}/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
    
        setActivity(response.data)
      })
  }

  useEffect(() => {
    getActivity()

  }, [])

  return (
    <div>
      {activity && <p>{activity.title}</p>}
      <p>Activity</p>
    </div>
  )
}

export default ActivityPage
