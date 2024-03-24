import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { MessageData, User, UserType } from "./models";
import { ToggleSwitch } from "./toggleSwitch.component";

const CHAT_SERVER_URL = "127.0.0.1:3000"; //default local port

function App() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const lastMessageRef = useRef<null | HTMLLIElement>(null);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    connectChatServer();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const connectChatServer = () => {
    const socket = io(CHAT_SERVER_URL);
    socketRef.current = socket;
    socketRef.current.onAny((type: UserType, message: string, user: User) => {
      console.log(type, message, user);
      setMessages((prevMessages) => [...prevMessages, { type, message, user }]);
      scrollToBottom();
    });
    return socket;
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socketRef.current && inputValue.trim()) {
      socketRef.current.emit(UserType.MESSAGE, inputValue);
      scrollToBottom();
      setInputValue("");
    }
  };

  const renderMessage = (message: MessageData) => {
    switch (message.type) {
      case "USER_JOINED": {
        return <span className="italic text-xs">Joined the chat</span>;
      }
      case "USER_LEFT": {
        return <span className="italic text-xs">Left the chat</span>;
      }
      case "USER_MESSAGE": {
        return <span className="flex-wrap">{message.message}</span>;
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-800 flex justify-center flex-col items-center">
      <h1 className="text-white text-2xl">Worlds best chat app</h1>
      <p className="text-white">Let's create an awesome chat client</p>
      <ToggleSwitch
        label="High contrast toggle"
        value={highContrast}
        setValue={setHighContrast}
      />
      <div className="chat-container">
        <ul className="message-container ">
          {messages.map((message, index) => {
            return (
              <li
                key={index}
                className={`message ${highContrast && "high-contrast"}`}
                ref={lastMessageRef}
              >
                <span
                  className="text-xs"
                  style={
                    highContrast
                      ? { color: "black", fontWeight: "bold" }
                      : { color: message.user.color, fontWeight: "normal" }
                  }
                >
                  {message.user.username}
                </span>

                {renderMessage(message)}
              </li>
            );
          })}
          {messages.length === 0 && (
            <span className="text-white">No one has entered the chat..</span>
          )}
        </ul>

        <form onSubmit={sendMessage} className="input-container mt-12">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="message-input mr-2"
          />
          <button
            type="submit"
            className={`send-button ${
              inputValue.trim() ? "active-button" : "disabled-button"
            }`}
            disabled={!inputValue.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
