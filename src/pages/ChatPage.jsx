import axios from "axios"
import React, { createRef, useState, useEffect } from "react"

import io from "socket.io-client"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import Container from "react-bootstrap/Container"

const API_URL = process.env.REACT_APP_API_URL
let socket = ""

function ChatPage() {
  // Assing a ref to the messages div

  const { user, therapist } = useContext(AuthContext)

  let messagesEnd = createRef()

  //const [loading, setLoading] = useState(true)
  const [messageList, setMessageList] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")
  const { chatId } = useParams()

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    //setup your socket connection with the server
    const storedToken = localStorage.getItem("authToken")

    socket = io(`${API_URL}`)

    const getMessages = async () => {
      let response = await axios.get(`${API_URL}/messages/${chatId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      // setLoading(false)
      setMessageList(response.data)

      // ensure that the user is connected to a specific chat via webSocket
      socket.emit("join_chat", chatId)

      //Handle incoming messages from webSocket
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

    if (user) {
      messageContent = {
        chatId,
        content: {
          sender: user,
          message: currentMessage,
        },
      }

      await socket.emit("send_message", messageContent)
      setMessageList([...messageList, messageContent.content])
      setCurrentMessage("")
    } else if (therapist) {
      messageContent = {
        chatId,
        content: {
          sender: therapist,
          message: currentMessage,
        },
      }
      await socket.emit("send_message", messageContent)
      setMessageList([...messageList, messageContent.content])
      setCurrentMessage("")
    }
  }

  // if (loading) {
  //       <p>Loading all messages . . .</p>
  //   }

  return (
    <Container>
      <h3>You're in the Chat Page </h3>
      <div className="chatContainer">
        <div className="messages">
          {messageList.map((val) => {
            return (
              <div>
                {user && (
                  <div
                    key={val._id}
                    className="messageContainer"
                    id={val.sender.name == user.name ? "You" : "Other"}>
                    <div className="messageIndividual">
                      {val.sender.name}: {val.message}
                    </div>
                  </div>
                )}
                {therapist && (
                  <div
                    key={val._id}
                    className="messageContainer"
                    id={val.sender.name == therapist.name ? "You" : "Other"}>
                    <div className="messageIndividual">
                      {val.sender.name}: {val.message}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          <div
            style={{ float: "left", clear: "both" }}
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

export default ChatPage
