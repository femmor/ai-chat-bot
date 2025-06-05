import "./ChatBotStart.css";

type ChatBotStartProps = {
    onStartChat: () => void;
}

const ChatBotStart = ({ onStartChat }: ChatBotStartProps) => {
    return (
        <div className="start-page">
            <button className="start-page-btn" onClick={onStartChat}>
                Chat AI
            </button>
        </div>
    )
}
export default ChatBotStart