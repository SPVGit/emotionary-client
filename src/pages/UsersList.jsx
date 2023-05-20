import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

function UsersList() {
  const { therapist } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const storedToken = localStorage.getItem("authTherapistToken")

  console.log(storedToken)

  const getUsers = () => {
    //const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const allUsers = response.data
        console.log("response.data", response.data)

        setUsers(allUsers)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUsers()
  }, [])

  // CHAT button //
  const handleChatClick = (chatUserId) => {
    //  const storedToken = localStorage.getItem("authToken");
    /*   if(!user){
          navigate('/signin')
          return; 
      }*/
    //   else {
    let data = {
      participants: [chatUserId, therapist._id],
    }
    axios.post(`${API_URL}/conversation`, data, { headers: { Authorization: `Bearer ${storedToken}` } }).then((response) => {
      navigate(`/therchat/${response.data._id}`)
    })

    //  }
  }
  return (
    <div>
      {users.map((chatUser) => {
        return (
          <p key={chatUser._id}>
            {chatUser.name}
            <button
              onClick={() => {
                handleChatClick(chatUser._id)
              }}>
              Chat
            </button>
          </p>
        )
      })}
    </div>
  )
}
export default UsersList
