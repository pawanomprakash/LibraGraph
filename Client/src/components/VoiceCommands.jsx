import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react"; // Import useUser to get the current user
import '../Styles/VoiceCommands.css';

const VoiceCommands = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user } = useUser(); // Check if the user is signed in and get user details
  const audioRef = useRef(null); // Reference to track the current audio instance

  useEffect(() => {
    if (isSignedIn) {
      const username = user?.firstName || "there";
      setMessages([{ role: 'assistant', content: `Hi ${username}, how can I help you today?` }]);
    } else {
      setMessages([{ role: 'assistant', content: 'Sign in to use the VoiceBot.' }]);
    }
  }, [isSignedIn, user]);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  const synth = window.speechSynthesis;

  const startListening = () => {
    if (!isSignedIn) {
      alert('Please sign in to use the VoiceBot.');
      return;
    }
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
    setInput(final);
    sendMessage(final);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const sendMessage = async (message) => {
    if (!message.trim() || !isSignedIn) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3000/api/voicebot/chat', { text: message });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);

      if (data.audio) {
        if (audioRef.current) {
          audioRef.current.pause(); // Stop the previous audio
          audioRef.current.currentTime = 0; // Reset playback position
        }
        const audio = new Audio(data.audio);
        audioRef.current = audio; // Set the new audio instance
        audio.play();
      } else {
        synth.cancel(); // Stop any ongoing text-to-speech
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
      <div className="input-container">
        <input
          type="text"
          value={input}
          className="input"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={!isSignedIn} // Disable input if not signed in
        />
        <button className="button" onClick={() => sendMessage(input)} disabled={!isSignedIn}>
          Send
        </button>
        <button
          className={`button ${isListening ? 'recording' : ''}`}
          onMouseDown={startListening}
          onMouseUp={stopListening}
          disabled={!isSignedIn} // Disable button if not signed in
        >
          {isListening ? 'Recording' : 'Hold to Record'}
        </button>
      </div>
    </div>
  );
};

export default VoiceCommands;
