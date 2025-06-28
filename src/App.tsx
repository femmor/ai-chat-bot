import { useState } from "react"
import { ChatBotApp, ChatBotStart } from "./components"
import type { Chat, Message } from "./types"
import { v4 as uuidv4 } from "uuid"


const App = () => {
  const [isChatting, setIsChatting] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<string | null>(null)

  const handleStartChat = () => {
    setIsChatting(!isChatting)

    if (chats.length === 0) {
      createNewChat()
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      messages: [] as Message[],
    }

    const updatedChats = [newChat, ...chats]
    setChats(updatedChats)
    setActiveChat(newChat.id)
  }

  return (
    <div className="container">
      {isChatting ? (<ChatBotApp onGoBack={handleGoBack} chats={chats} setChats={setChats} activeChat={activeChat} setActiveChat={setActiveChat} onNewChat={createNewChat} />) : (<ChatBotStart onStartChat={handleStartChat} />)}
    </div>
  )
}
export default App