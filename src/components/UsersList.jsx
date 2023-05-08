import axios from "axios"
import config from "../config"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"

function UserList() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const getUsers = async () => {
      let response = await axios.get(`${config.API_URL}/api/users`, { withCredentials: true })
      setUsers(response.data)

      try {
        let userResponse = await axios.get(`${config.API_URL}/api/user`, { withCredentials: true })
        setUser(userResponse.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  const handleChatClick = (chatUserId) => {
    let data = {
      participants: [chatUserId, user._id],
    }
    axios.post(`${config.API_URL}/api/conversation`, data, { withCredentials: true }).then((response) => {
      navigate(`/chat/${response.data._id}`)
    })
  }

  // remove yourself if you're signed in
  let allUsers = users
  if (user) {
    allUsers = users.filter((u) => u._id !== user._id)
  }
  return (
    <div>
      {allUsers.map((user) => {
        return (
          <p>
            {user.name}
            <button
              onClick={() => {
                handleChatClick(user._id)
              }}>
              Chat
            </button>
          </p>
        )
      })}
    </div>
  )
}

export default UserList
