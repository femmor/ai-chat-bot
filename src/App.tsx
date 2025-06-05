import { useState } from "react"
import { ChatBotApp, ChatBotStart } from "./components"

const App = () => {
  const [isChatting, setIsChatting] = useState(false)

  const handleChatting = () => {
    setIsChatting(!isChatting)
  }

  return (
    <div className="container">
      {isChatting ? (<ChatBotApp onGoBack={handleChatting} />) : (<ChatBotStart onStartChat={handleChatting} />)}
    </div>
  )
}
export default App