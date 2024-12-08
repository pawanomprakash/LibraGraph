// src/components/Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-col items-center px-6 py-4 w-full bg-gray-900 text-gray-100 shadow-lg">
      <div className="flex justify-between items-center w-full max-w-[1200px]">
        {/* Navigation */}
        <nav className="flex gap-6 text-lg font-medium">
          <a href="#contact" className="hover:text-blue-500 transition">Contact Us</a>
          <a href="#help" className="hover:text-blue-500 transition">Help</a>
          <a href="#about" className="hover:text-blue-500 transition">About</a>
        </nav>

        {/* Search Bar & Profile */}
        <div className="flex gap-4 items-center">
          {/* Search Bar */}
          <form className="flex items-center bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
            <label htmlFor="search" className="sr-only">Search</label>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f579068de68dc81a9a72ec1b8d5f82883c40a6298184b90250ac4f2ebd396f2"
              alt="Search Icon"
              className="w-5 h-5 mr-2"
            />
            <input
              type="search"
              id="search"
              placeholder="Search for books..."
              className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
            />
          </form>

          {/* Profile Picture */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/de60c8eef20a7dc398eecdf2a91aa4b245a026c922d047fe5f0d7bd5f5fa2d4c"
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-700 hover:shadow-md transition"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
