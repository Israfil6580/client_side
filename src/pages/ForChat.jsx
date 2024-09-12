import { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:3001");

function ForChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Emit the message to the server
      socket.emit("sendMessage", message);
      setMessage(""); // Clear the input
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Real-time Chat</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ marginRight: "10px", padding: "10px", width: "300px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
          Send
        </button>
      </div>
      <ul style={{ marginTop: "20px" }}>
        {messages.map((msg, index) => (
          <li key={index} style={{ padding: "5px 0" }}>
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ForChat;
