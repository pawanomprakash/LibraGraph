import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return; // Prevent empty messages
    setMessages([
      ...messages,
      { text: input, fromUser: true },
      { text: 'How can I assist you?', fromUser: false },
    ]);
    setInput(''); // Clear the input field
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto p-6 bg-gradient-to-r from-purple-700 via-blue-800 to-indigo-900 rounded-lg shadow-lg">
      <h2 className="text-2xl text-gray-100 mb-4 font-bold text-center">Chatbot</h2>
      <div className="flex-grow overflow-y-auto bg-gray-800 p-4 rounded-lg mb-4 space-y-3 max-h-80">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.fromUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm ${
                msg.fromUser
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-700 text-gray-200 self-start'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow py-2 px-4 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-gray-100 py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
