import axios from "axios"
import React, { createRef, useState, useEffect } from "react"
import io from "socket.io-client"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import Container from "react-bootstrap/Container"

/* This is the therapist's chat box from which the therapist can chat to a user sharing the same chat ID */

const API_URL = process.env.REACT_APP_API_URL
let socket = ""

function TherChat() {
  const { therapist } = useContext(AuthContext)
  const { chatId } = useParams()
  let messagesEnd = createRef()

  const [messageList, setMessageList] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  const storedToken = localStorage.getItem("authTherapistToken")

  useEffect(() => {
    //This sets up the socket connection with the server

    socket = io(`${API_URL}`)

    const getMessages = async () => {
      //GETS LIST OF MESSAGES

      let response = await axios.get(`${API_URL}/messages/${chatId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      setMessageList(response.data)

      // Ensures that the user is connected to a specific chat via webSocket

      socket.emit("join_chat", chatId)

      //Handles incoming messages from webSocket

      socket.on("receive_message", (data) => {
        console.log("Got data", data)
        setMessageList(data)
      })
    }

    getMessages()
  }, [])

  useEffect(() => {
    // makes the chat scroll to the bottom everytime a new message is sent or received

    scrollToBottom()
  }, [messageList])

  const handleMessageInput = (e) => {
    setCurrentMessage(e.target.value)
    console.log(e.target.value)
  }

  const sendMessage = async () => {
    let messageContent = ""

    function create_UUID() {
      //Creates a unique id for every message sent to prevent the key warning on console.

      var dt = new Date().getTime()
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16)
      })
      return uuid
    }

    messageContent = {
      uniqueId: create_UUID(),
      chatId,
      sender: therapist,
      senderName: therapist.name,
      message: currentMessage,
    }

    await socket.emit("send_message", messageContent)
    setMessageList([...messageList, messageContent])
    setCurrentMessage("")
  }

  return (
    <Container className="d-flex flex-column align-items-center">
      <h3>You're in the Chat Page </h3>
      <div className="chatContainer glass">
        <div className="messages">
          {messageList.map((val) => {
            return (
              <div
                key={val.uniqueId}
                className="messageContainer"
                id={val.senderName == therapist.name ? "You" : "Other"}>
                <div
                  className="messageIndividual d-flex flex-row "
                  style={{ height: "auto", padding: "10px" }}>
                  <div
                    className="d-flex align-items-stretch"
                    style={{ wordBreak: "break-word" }}>
                    {" "}
                    {val.senderName}: {val.message}{" "}
                  </div>
                </div>
              </div>
            )
          })}

          <div
            style={{ float: "left", clear: "both" }} //If its the other user, the message will be displayed on the left
            ref={(el) => {
              messagesEnd = el
            }}></div>
        </div>

        <div className="messageInputs">
          <input
            value={currentMessage}
            type="text"
            placeholder="Message..."
            onChange={handleMessageInput}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </Container>
  )
}

export default TherChat
