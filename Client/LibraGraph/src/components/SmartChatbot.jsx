// Chatbot.js
import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, fromUser: true }]);
    // Add chatbot response logic
    setMessages([...messages, { text: message, fromUser: true }, { text: 'How can I assist you?', fromUser: false }]);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromUser ? 'text-right' : 'text-left'}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <button onClick={() => handleSendMessage('Hello!')} className="bg-blue-500 text-white py-2 px-4 rounded">
        Send Message
      </button>
    </div>
  );
};

export default Chatbot;
