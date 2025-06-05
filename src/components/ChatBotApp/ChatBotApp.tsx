import { CircleX, Edit3Icon, MoveLeft, Send, Smile } from "lucide-react"
import "./ChatBotApp.css"
import type { Chat, Message } from "../../types";
import { useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";

type ChatBotAppProps = {
    onGoBack: () => void;
    chats: Chat[];
    setChats: (chats: Chat[]) => void;
}

const ChatBotApp = ({ onGoBack, chats, setChats }: ChatBotAppProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>(chats[0]?.messages || []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;

        const newMessage = {
            type: "prompt",
            text: inputValue,
            timestamp: new Date().toLocaleTimeString(),
        }

        const updatedMessages = [...messages, newMessage]
        setMessages(updatedMessages)
        setInputValue("");

        const updatedChats = chats.map((chat, index) => {
            if (index === 0) {
                // Assuming we are updating the first chat
                return { ...chat, messages: updatedMessages };
            }
            return chat;
        })

        setChats(updatedChats)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
        if (e.key === "Escape") {
            setInputValue("");
        }
    }

    return (
        <div className="chat-app">
            <div className="chat-list">
                <div className="chat-list-header">
                    <h2>Chat List</h2>
                    <Edit3Icon className="new-chat" size={30} />
                </div>
                {chats.map((chat, index) => (
                    <div key={index} className={`chat-list-item ${index === 0 ? "active" : ""}`}>
                        <h4>{chat.id}</h4>
                        <CircleX className="delete-chat" />
                    </div>
                ))}
            </div>

            <div className="chat-window">
                <div className="chat-title">
                    <h3>Chat with AI</h3>
                    <MoveLeft className="arrow" onClick={onGoBack} />
                </div>
                <div className="chat">
                    {messages.map((message, index) => (
                        <div key={index} className={message.type === "prompt" ? "prompt" : "response"}>
                            <span className="message-text">{message.text}</span>
                            <span className="message-time">{message.timestamp}</span>
                        </div>
                    ))}

                    <div className="typing">Typing...</div>
                </div>
                <form className="msg-form" onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    e.preventDefault()
                }>
                    <Smile className="smile emoji" />
                    <input type="text" placeholder="Type your message here..." className="msg-input" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                    <Send className="send-message" onClick={handleSendMessage} />
                </form>
            </div>
        </div>
    )
}
export default ChatBotApp