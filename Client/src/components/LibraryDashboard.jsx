// LibraryDashboard.js
import React from 'react';

const LibraryDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-4xl p-8 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">
          Library Dashboard
        </h2>
        <p className="text-lg text-gray-200 text-center leading-relaxed">
          Welcome to your library dashboard! Here, you can view your borrowed books, manage your activity, and explore more features tailored to enhance your library experience.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            View Borrowed Books
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            Explore Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;
