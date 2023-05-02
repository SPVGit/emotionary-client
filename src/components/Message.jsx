import React from "react"
// import { auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

const Message = ({ message }) => {
  //const [user] = useAuthState(auth)
  const { user, isLoggedIn, isLoading } = useContext(AuthContext)

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  )
}
export default Message
