import { io } from "socket.io-client";

const CHAT_SERVER_URL = "127.0.0.1:3000" //default local port

const connectChatServer = () => {
  const socket = io(CHAT_SERVER_URL);
  socket.onAny((type: string, message: string, user: any) => console.log(type, message, user));
  return socket;
};

function App() {
  return (
    <div className="w-screen h-screen bg-slate-800">
      <h1 className="text-white text-2xl">Worlds best chat app</h1>
      <p className="text-white">Let's create an awesome chat client</p>
    </div>
  );
}

export default App;
