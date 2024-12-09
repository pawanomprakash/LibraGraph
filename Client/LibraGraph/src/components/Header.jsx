// src/components/Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-col items-center px-6 py-6 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-gray-100 shadow-xl">
      <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
        {/* Navigation */}
        <nav className="flex gap-10 text-lg font-semibold">
          <a href="#contact" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105">Contact Us</a>
          <a href="#help" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105">Help</a>
          <a href="#about" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105">About</a>
        </nav>

        {/* Search Bar & Profile */}
        <div className="flex gap-6 items-center">
          {/* Search Bar */}
          <form className="flex items-center bg-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <label htmlFor="search" className="sr-only">Search</label>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f579068de68dc81a9a72ec1b8d5f82883c40a6298184b90250ac4f2ebd396f2"
              alt="Search Icon"
              className="w-6 h-6 mr-2"
            />
            <input
              type="search"
              id="search"
              placeholder="Search for books..."
              className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none w-64 text-lg"
            />
          </form>

          {/* Profile Picture */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/de60c8eef20a7dc398eecdf2a91aa4b245a026c922d047fe5f0d7bd5f5fa2d4c"
            alt="User Profile"
            className="w-14 h-14 rounded-full border-2 border-gray-700 hover:border-blue-400 hover:scale-105 transition-all duration-300 transform"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
