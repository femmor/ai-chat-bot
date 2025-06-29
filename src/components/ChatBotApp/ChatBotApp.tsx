import { CircleX, Edit3Icon, MoveLeft, Send, Smile } from "lucide-react"
import "./ChatBotApp.css"
import type { Chat, Message } from "../../types";
import {
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
    type KeyboardEvent
} from "react";

type ChatBotAppProps = {
    onGoBack: () => void;
    chats: Chat[];
    setChats: (chats: Chat[]) => void;
    activeChat: string | null;
    setActiveChat: (activeChat: string) => void;
    onNewChat: (inputValue: string) => void;
}

const ChatBotApp = ({ onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat }: ChatBotAppProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>(chats[0]?.messages || []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === "") return;

        const newMessage = {
            type: "prompt",
            text: inputValue,
            timestamp: new Date().toLocaleTimeString(),
        }

        if (!activeChat) {
            onNewChat(inputValue);
            setInputValue("");
        } else {
            const updatedMessages = [...messages, newMessage]
            setMessages(updatedMessages)
            setInputValue("");

            const updatedChats = chats.map((chat) => {
                if (chat.id === activeChat) {
                    return { ...chat, messages: updatedMessages };
                }
                return chat;
            })

            setChats(updatedChats)

            // Connect to OPEN AI API to get a response
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        { role: "user", content: inputValue },
                    ],
                    max_tokens: 500,
                })
            });

            const data = await response.json();
            const chatResponse = data.choices[0].message.content.trim();

            const newResponseMessage: Message = {
                type: "response",
                text: chatResponse,
                timestamp: new Date().toLocaleTimeString(),
            }

            const updatedMessagesWithResponse = [...updatedMessages, newResponseMessage];

            setMessages(updatedMessagesWithResponse)

            const updatedChatsWithResponse = chats.map((chat) => {
                if (chat.id === activeChat) {
                    return { ...chat, messages: updatedMessagesWithResponse };
                }
                return chat;
            })

            setChats(updatedChatsWithResponse);
            setActiveChat(activeChat); // Ensure the active chat is set correctly
        }
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

    const handleSelectChat = (chatId: string) => {
        setActiveChat(chatId);
    }

    const handleDeleteChat = (chatId: string) => {
        const updatedChats = chats.filter(chat => chat.id !== chatId);
        setChats(updatedChats);
        if (activeChat === chatId) {
            const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
            setActiveChat(newActiveChat || '');
        }
    }

    // Handles the messages for the active chat
    useEffect(() => {
        const currentChat = chats.find(chat => chat.id === activeChat);
        setMessages(currentChat ? currentChat.messages : []);
    }, [activeChat, chats])

    return (
        <div className="chat-app">
            <div className="chat-list">
                <div className="chat-list-header">
                    <h2>Chat List</h2>
                    <Edit3Icon className="new-chat" size={30} onClick={() => onNewChat(inputValue)} />
                </div>
                {chats.map((chat) => (
                    <div key={chat.id} className={`chat-list-item ${chat.id === activeChat ? "active" : ""}`} onClick={() => handleSelectChat(chat.id)}>
                        <h4>{chat.displayId}</h4>
                        <CircleX className="delete-chat" onClick={(e) => {
                            e.stopPropagation(); // Prevents the click from propagating to the chat selection
                            handleDeleteChat(chat.id);
                        }} />
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