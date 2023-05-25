import axios from "axios"
import React, { createRef, useState, useEffect } from "react"

import io from "socket.io-client"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const API_URL = process.env.REACT_APP_API_URL
let socket = ""

function ChatPage() {
  // Assing a ref to the messages div

  const { user } = useContext(AuthContext)
  const storedToken = localStorage.getItem("authToken")

  let messagesEnd = createRef()

  //const [loading, setLoading] = useState(true)
  const [messageList, setMessageList] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")
  // const [msgState, setMsgState] = useState(false)
  const { chatId } = useParams()

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    //setup your socket connection with the server

    socket = io(`${API_URL}`)

    const getMessages = async () => {
      let response = await axios.get(`${API_URL}/messages/${chatId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      // setLoading(false)
      setMessageList(response.data)

      // ensure that the user is connected to a specific chat via webSocket
      socket.emit("join_chat", chatId)

      //Handle incoming messages from webSocket and also sets it into State
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
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    let messageContent = ""

    function create_UUID() {
      //sets a unique key to each message to prevent key warning on console
      var dt = new Date().getTime()
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
      })
      return uuid
    }

    messageContent = {
      uniqueId: create_UUID(),
      chatId,
      sender: user,
      senderName: user.name,
      message: currentMessage,
    }

    await socket.emit("send_message", messageContent) //sends the message to the backend and also sets it into State
    setMessageList([...messageList, messageContent])
    setCurrentMessage("")
  }

  return (
    <Container className="d-flex flex-column align-items-center rounded">
      <h3>You're in the Chat Page </h3>
      <Container className="chatContainer glass d-flex justify-contente-center ">
        <div className="messages">
          {messageList.map((val) => {
            return (
              <div
                key={val.uniqueId}
                className="messageContainer"
                id={val.senderName === user.name ? "You" : "Other"}>
                <div
                  className="messageIndividual d-flex flex-row "
                  style={{ height: "auto", width: "50vw", padding: "10px" }}>
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
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              messagesEnd = el
            }}></div>
        </div>

        <Form
          className="messageInputs "
          style={{ overflowY: "auto" }}
          onSubmit={handleOnSubmit}>
          <input
            className="rounded"
            value={currentMessage}
            type="text"
            placeholder="Message..."
            onChange={handleMessageInput}
          />

          <Button
            className="rounded"
            type="submit">
            Send
          </Button>
        </Form>
      </Container>
    </Container>
  )
}

export default ChatPage
