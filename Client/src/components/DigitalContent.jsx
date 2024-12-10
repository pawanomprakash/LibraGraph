// DigitalContent.js
import React from 'react';

const DigitalContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-3xl p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-500 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-6 animate-pulse">
          Digital Content
        </h2>
        <p className="text-lg text-gray-300 text-center leading-relaxed">
          Access e-books, audiobooks, and more from our expansive digital library. Explore a world of knowledge at your fingertips!
        </p>
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            Explore E-Books
          </button>
          <button className="ml-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            Listen to Audiobooks
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalContent;
