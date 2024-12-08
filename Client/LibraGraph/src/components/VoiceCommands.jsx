// VoiceCommands.js
import React, { useEffect } from 'react';

const VoiceCommands = () => {
  useEffect(() => {
    const recognition = new window.SpeechRecognition();
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript;
      console.log('Voice Command:', command);
    };
    recognition.start();
  }, []);

  return (
    <div>
      <p>Voice Commands are enabled. Speak to interact.</p>
    </div>
  );
};

export default VoiceCommands;
