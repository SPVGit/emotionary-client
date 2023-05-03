import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
const API_URL = "http://localhost:5006"

function Client() {
  const [clients, setClients] = useState([])

  const storedToken = localStorage.getItem("authToken")
  const getAllClients = () => {
    axios
      .get(`${API_URL}/client`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response", response)
        setClients(response.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div>
      {clients.map((client) => (
        <div key={client._id}>{client.name}</div>
      ))}
    </div>
  )
}

export default Client
