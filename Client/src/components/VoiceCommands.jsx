import React, { useState } from 'react';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';
import '../Styles/VoiceCommands.css';

const VoiceCommands = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false; // Stop after the user finishes speaking
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  const synth = window.speechSynthesis;

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  recognition.onresult = (event) => {
    let final = '';
    for (let i = 0; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        final += transcript;
      }
    }
    setInput(final); // Update the input box with the final transcript
    sendMessage(final); // Send the message automatically when done
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3000/api/voicebot/chat', { text: message });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);

      if (data.audio) {
        const audio = new Audio(data.audio);
        audio.play();
      } else {
        speakText(data.text);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="loading">Loading...</div>}
      </div>
      <input
        type="text"
        value={input}
        className="input"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button className="button" onClick={() => sendMessage(input)}>
        Send
      </button>
      <button
        className={`button ${isListening ? 'recording' : ''}`}
        onMouseDown={startListening}
        onMouseUp={stopListening}
      >
        {isListening ? 'Recording...' : 'Hold to Record'}
      </button>
    </div>
  );
};

export default VoiceCommands;
