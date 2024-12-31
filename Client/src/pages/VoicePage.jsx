import React from "react";
import VoiceCommand from "./VoiceCommand";

const VoicePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <div className="bg-gray-800/80 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <VoiceCommand />
      </div>
    </div>
  );
};

export default VoicePage;
