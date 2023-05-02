import React, { useEffect, useState, useContext } from "react"
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore"
import { db } from "../firebase"
import Message from "./Message"
import { AuthContext } from "../context/auth.context"
import SendMessage from "./SendMessage"

const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const { user, isLoggedIn, isLoading } = useContext(AuthContext)

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50))
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = []
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(messages)
      console.log(messages)
    })
    return () => unsubscribe
  }, [])

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
      </div>
      <SendMessage />
    </main>
  )
}
export default ChatBox
