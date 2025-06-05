import { CircleX, Edit3Icon, MoveLeft, Send, Smile } from "lucide-react"
import "./ChatBotApp.css"

type ChatBotAppProps = {
    onGoBack: () => void;
}

const ChatBotApp = ({ onGoBack }: ChatBotAppProps) => {
    return (
        <div className="chat-app">
            <div className="chat-list">
                <div className="chat-list-header">
                    <h2>Chat List</h2>
                    <Edit3Icon className="new-chat" size={30} />
                </div>
                <div className="chat-list-item active">
                    <h4>Chat 06/01/2025 12:59:42 PM</h4>
                    <CircleX className="delete-chat" />
                </div>
                <div className="chat-list-item">
                    <h4>Chat 06/01/2025 12:59:42 PM</h4>
                    <CircleX className="delete-chat" />
                </div>
                <div className="chat-list-item">
                    <h4>Chat 06/01/2025 12:59:42 PM</h4>
                    <CircleX className="delete-chat" />
                </div>
            </div>

            <div className="chat-window">
                <div className="chat-title">
                    <h3>Chat with AI</h3>
                    <MoveLeft className="arrow" onClick={onGoBack} />
                </div>
                <div className="chat">
                    <div className="prompt">Hi!, How are you?
                        <span>12:59:51 PM</span>
                    </div>
                    <div className="response">Hello, I'm just a computer program without feelings but I am here and ready to help! How can I assist you today?
                        <span>12:59:51 PM</span>
                    </div>
                    <div className="typing">Typing...</div>
                </div>
                <form className="msg-form">
                    <Smile className="smile emoji" />
                    <input type="text" placeholder="Type your message here..." className="msg-input" />
                    <Send className="send-message" />
                </form>
            </div>
        </div>
    )
}
export default ChatBotApp