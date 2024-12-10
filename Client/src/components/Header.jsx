// src/components/Header.jsx

import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


const Header = () => { // Add onSearch prop
  return (
    <header className="flex flex-col items-center px-6 py-6 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-gray-100 shadow-xl">
      <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
        {/* Navigation */}
        <nav className="flex gap-10 text-lg font-semibold">
          <a href="#contact" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105">Contact Us</a>
          <a href="#help" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105">Help</a>
          <a href="#about" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105">About</a>
        </nav>

        {/* Profile */}
        <div className="flex gap-6 items-center">     
                  
        {/* Auth and Profile Section */}
        <div className="flex gap-6 items-center">
          {/* Signed Out */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-blue-400 transition-all duration-300 m-6">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          {/* Signed In */}
          <SignedIn>
            <UserButton     appearance={{
                elements: {
                  avatarBox: "w-14 h-14 rounded-full border-2 border-gray-700 hover:border-blue-400 hover:scale-105 transition-all duration-300 transform",
                  userButtonOuter: "p-2 bg-gray-800 rounded-lg hover:shadow-lg",
                  dropdownMenu: "bg-gray-900 text-gray-100 rounded-lg shadow-lg",
                  dropdownItem: "px-4 py-2 hover:bg-gray-700 rounded-md transition-all duration-300",
                },
              }}/>
          </SignedIn>
        </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
