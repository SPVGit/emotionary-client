import { useEffect, useState, useRef } from "react"
import Talk from "talkjs"

function MyChatComponent() {
  // wait for TalkJS to load
  const chatboxEl = useRef()
  const [talkLoaded, markTalkLoaded] = useState(false)

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true))
    if (talkLoaded) {
      // After `Talk.ready`
      const currentUser = new Talk.User({
        id: "1",
        name: "Henry Mill",
        email: "henrymill@example.com",
        photoUrl: "henry.jpeg",
        welcomeMessage: "Hello!",
        role: "default",
      })

      // After `Talk.ready`
      const otherUser = new Talk.User({
        id: "2",
        name: "Jessica Wells",
        email: "jessicawells@example.com",
        photoUrl: "jessica.jpeg",
        welcomeMessage: "Hello!",
        role: "default",
      })

      const session = new Talk.Session({
        // hide this appID !!!!
        appId: "tOi0kJFM",
        me: currentUser,
      })

      const conversationId = Talk.oneOnOneId(currentUser, otherUser)
      const conversation = session.getOrCreateConversation(conversationId)
      conversation.setParticipant(currentUser)
      conversation.setParticipant(otherUser)

      const chatbox = session.createChatbox()
      chatbox.select(conversation)
      chatbox.mount(chatboxEl.current)

      return () => session.destroy()
    }
  }, [talkLoaded])

  return (
    <div
      style={{ width: 500, height: 500 }}
      ref={chatboxEl}
    />
  )
}

export default MyChatComponent
