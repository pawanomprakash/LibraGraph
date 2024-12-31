// src/pages/VoiceBot.jsx
import React from 'react';
import VoiceCommand from '../components/VoiceCommands'; // Import the VoiceCommand component

const VoiceBot = () => {
  return (
    <div className="h-screen w-full bg-black text-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Voice Command</h1>
        <VoiceCommand />
      </div>
    </div>
  );
};

export default VoiceBot;
