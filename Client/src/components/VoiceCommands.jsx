import React, { useEffect, useState } from 'react';
import '../Styles/VoiceCommands.css'; // Assuming you'll add styles in this file

const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false); // To track if the system is speaking

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
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

    setInterimTranscript('');
    setFinalTranscript('');
    setResponse('');
  };

  const speakResponse = (text) => {
    if (!synth) {
      console.error("Speech synthesis not supported in this browser.");
      return;
    }

    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    const voices = synth.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices.find(voice => voice.lang === "en-US") || voices[0];
    }

    utterance.onstart = () => {
      setIsSpeaking(true); // Speech started
      console.log("Speech started...");
    };

    utterance.onend = () => {
      setIsSpeaking(false); // Speech ended
      console.log("Speech finished.");
    };

    utterance.onerror = (e) => console.error("Speech error:", e);

    synth.speak(utterance);
  };

  useEffect(() => {
    recognition.onstart = () => {
      console.log('Voice recognition started.');
    };

    recognition.onresult = (event) => {
      let interimText = '';
      let finalText = finalTranscript;

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcript + ' ';
        } else {
          interimText += transcript + ' ';
        }
      }

      setInterimTranscript(interimText);
      setFinalTranscript(finalText);

      if (finalText.trim()) handleCommand(finalText.trim());
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition: ', event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
    };

    return () => {
      recognition.stop();
    };
  }, [finalTranscript]);

  const handleCommand = (command) => {
    let responseText = '';

    if (command.toLowerCase().includes('catalog')) {
      responseText = 'Opening the catalog...';
    } else if (command.toLowerCase().includes('borrow book')) {
      responseText = 'Navigating to borrow a book section...';
    } else if (command.toLowerCase().includes('dashboard')) {
      responseText = 'Opening library dashboard...';
    } else {
      responseText = "I didn't understand that. Please try again.";
    }

    setResponse(responseText);
    speakResponse(responseText);
  };

  return (
    <div className="voice-commands-container">
      <h2 className="title">Voice Commands</h2>
      
      {/* Centered button with sound wave animation */}
      <div className="button-container">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`voice-button ${isListening ? 'listening' : ''}`}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        {isListening && <div className="sound-wave"></div>}
      </div>

      {/* Transcripts and response */}
      <div className="mt-4">
        <textarea
          className="transcript-box"
          value={interimTranscript}
          readOnly
          placeholder="Listening..."
        ></textarea>
        <p className="transcript-text">
          <strong>Final Command:</strong> {finalTranscript || 'No command detected yet.'}
        </p>
        <p className="response-text">
          <strong>Response:</strong> {response || 'No response yet.'}
        </p>
      </div>
    </div>
  );
};

export default VoiceCommands;
