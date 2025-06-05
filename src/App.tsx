import { useState } from "react"
import { ChatBotApp, ChatBotStart } from "./components"
import type { Chat, Message } from "./types"


const App = () => {
  const [isChatting, setIsChatting] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])

  const handleStartChat = () => {
    setIsChatting(!isChatting)

    if (chats.length === 0) {
      const newChat: Chat = {
        id: `Chat ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        messages: [] as Message[],
      }

      setChats([newChat])
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  return (
    <div className="container">
      {isChatting ? (<ChatBotApp onGoBack={handleGoBack} chats={chats} setChats={setChats} />) : (<ChatBotStart onStartChat={handleStartChat} />)}
    </div>
  )
}
export default App