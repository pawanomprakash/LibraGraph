import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const VoiceCommands = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      const username = user?.firstName || "there";
      setMessages([{ role: "assistant", content: `Hi ${username}, how can I help you today?` }]);
    } else {
      setMessages([{ role: "assistant", content: "Sign in to use the VoiceBot." }]);
    }
  }, [isSignedIn, user]);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  const synth = window.speechSynthesis;

  const startListening = () => {
    if (!isSignedIn) {
      alert("Please sign in to use the VoiceBot.");
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
    let final = "";
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
    console.error("Speech recognition error:", event.error);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const sendMessage = async (message) => {
    if (!message.trim() || !isSignedIn) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://localhost:3000/api/voicebot/chat", { text: message });
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);

      if (data.audio) {
        const audio = new Audio(data.audio);
        audio.play();
      } else {
        speakText(data.text);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full w-full text-gray-100"
      style={{
        backgroundImage: "url('https://media2.giphy.com/media/3o6UBedJJfaxXHvZyU/giphy.gif')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Chat Window */}
      <div className="flex flex-col flex-grow p-4 overflow-y-auto bg-gray-800/80 shadow-xl rounded-lg mx-auto mt-12 w-4/5 h-3/4 max-h-[600px] border border-gray-700">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-4 rounded-lg max-w-lg ${
              msg.role === "user"
                ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white self-end shadow-lg"
                : "bg-gray-700 text-gray-200 self-start shadow-md"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-400 text-center mt-2">Loading...</div>}
      </div>

      {/* Input and Actions */}
      <div className="flex items-center p-4 bg-gray-900/80 shadow-lg space-x-2 mx-auto w-4/5 rounded-lg border border-gray-800">
        <input
          type="text"
          value={input}
          className="flex-grow px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={!isSignedIn}
        />
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
          onClick={() => sendMessage(input)}
          disabled={!isSignedIn}
        >
          Send
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            isListening
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          } text-white disabled:opacity-50`}
          onMouseDown={startListening}
          onMouseUp={stopListening}
          disabled={!isSignedIn}
        >
          {isListening ? "Recording..." : "Hold to Record"}
        </button>
      </div>
    </div>
  );
};

export default VoiceCommands;
