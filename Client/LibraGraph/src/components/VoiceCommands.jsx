import React, { useEffect, useState } from 'react';

const VoiceCommands = () => {
  const [isRecognitionAvailable, setIsRecognitionAvailable] = useState(false);
  const [command, setCommand] = useState('');

  useEffect(() => {
    // Check if SpeechRecognition is available in the browser
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsRecognitionAvailable(true);
    } else {
      setIsRecognitionAvailable(false);
    }
  }, []);

  useEffect(() => {
    if (isRecognitionAvailable) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.onresult = (event) => {
        const voiceCommand = event.results[0][0].transcript;
        setCommand(voiceCommand);
        console.log('Voice Command:', voiceCommand);
      };

      recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
      };

      recognition.start();
    }
  }, [isRecognitionAvailable]);

  return (
    <div className="voice-commands-container">
      <div className="voice-commands-box">
        <h2 className="heading">Voice Commands</h2>
        {isRecognitionAvailable ? (
          <p className="subheading">Voice Commands are enabled. Speak to interact.</p>
        ) : (
          <p className="error-message">Your browser does not support Speech Recognition.</p>
        )}
        {command && <div className="command-display">You said: <strong>{command}</strong></div>}
      </div>
    </div>
  );
};

export default VoiceCommands;
