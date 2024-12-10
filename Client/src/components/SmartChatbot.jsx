import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control if the chat is open or closed

  const handleSendMessage = () => {
    if (input.trim() === '') return; // Prevent empty messages
    setMessages([
      ...messages,
      { text: input, fromUser: true },
      { text: 'How can I assist you today?', fromUser: false },
    ]);
    setInput(''); // Clear the input field
  };

  const toggleChat = () => {
    setIsOpen(!isOpen); // Toggle the chat open state
  };

  return (
    <>
      {/* Chatbot Icon */}
      {!isOpen && (
        <div
          onClick={toggleChat}
          className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 rounded-full flex justify-center items-center cursor-pointer shadow-xl transform transition-all hover:scale-110 z-50"
        >
          <span className="text-white text-3xl">💬</span>
        </div>
      )}

      {/* Chatbot Full Interface */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 bg-gray-900 p-6 rounded-lg shadow-xl flex flex-col transform transition-all z-50">
          <h2 className="text-2xl text-white mb-4 font-bold text-center">Chatbot</h2>
          <div className="flex-grow overflow-y-auto bg-gray-800 p-4 rounded-lg mb-4 space-y-3 max-h-80">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    msg.fromUser
                      ? 'bg-indigo-600 text-white self-end'
                      : 'bg-gray-700 text-gray-300 self-start'
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
              className="flex-grow py-2 px-4 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md transition-all"
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-600 text-gray-100 py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all shadow-md"
            >
              Send
            </button>
          </div>
          <button
            onClick={toggleChat}
            className="absolute top-2 right-2 text-gray-100 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-all shadow-md"
          >
            ❌
          </button>
        </div>
      )}
    </>
  );
};

export default Chatbot;
