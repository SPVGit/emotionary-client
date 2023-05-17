import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

function UsersList() {
  const { therapist } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  const storedToken = localStorage.getItem("authTherapistToken")

  console.log(storedToken)

  const getUsers = () => {
    console.log("monkey")
    axios
      .get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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

  return <div>{therapist.name}</div>
}
export default UsersList
