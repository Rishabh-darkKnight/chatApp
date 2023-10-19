import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ws = new WebSocket('ws://localhost:3030');

  useEffect(() => {
    ws.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessages([...messages, receivedMessage]);
    };

    return () => {
      ws.close();
    };
  }, [messages, ws]);

  const sendMessage = () => {
    ws.send(message);
    setMessage('');
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
