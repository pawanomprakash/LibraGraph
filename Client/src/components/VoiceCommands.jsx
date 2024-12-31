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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      {/* Chat Window */}
      <div className="flex flex-col p-4 max-w-2xl w-full bg-gray-800/80 rounded-lg shadow-lg mb-6 overflow-y-auto h-[60vh]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white self-end' : 'bg-gray-700 text-gray-200 self-start'}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-400 text-center mt-2 text-sm">Loading...</div>}
      </div>

      {/* Input and Actions */}
      <div className="flex items-center p-4 max-w-2xl w-full bg-gray-800/80 rounded-lg shadow-lg space-x-3">
        <input
          type="text"
          value={input}
          className="flex-grow px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={!isSignedIn}
        />
        <button
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 text-sm"
          onClick={() => sendMessage(input)}
          disabled={!isSignedIn}
        >
          Send
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${isListening ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'} text-white disabled:opacity-50 text-sm`}
          onMouseDown={startListening}
          onMouseUp={stopListening}
          disabled={!isSignedIn}
        >
          {isListening ? 'Recording' : 'Hold to Record'}
        </button>
      </div>
    </div>
  );
};

export default VoiceCommands;
