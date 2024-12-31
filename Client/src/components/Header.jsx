// src/components/Header.jsx
import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom'; // Importing Link for navigation

const Header = () => {
  return (
    <header className="w-full bg-gray-900 text-gray-100 shadow-xl">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8 py-5">
        
        {/* Logo and App Name Section */}
        <div className="flex items-center gap-4">
          <img
            src="https://static.wixstatic.com/media/9ba547_f7c0ef7b31e2498e8b0e819ae7986fa1~mv2.jpg/v1/fill/w_85,h_79,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/BroadrangeAI_logo.jpg" // Replace with the actual logo path
            alt="Library Logo"
            className="w-12 h-12 rounded-full border-2 border-gray-700 shadow-lg"
          />
          <span className="text-3xl font-extrabold tracking-wider text-gray-100 hover:text-blue-400 transition-all duration-300">
            LibraGraph AI
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="hidden md:flex gap-12 text-lg font-medium">
          <Link
            to="/books" // Link to the Books page
            className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Books
          </Link>
          <Link
            to="/digital-books" // Link to the Digital Books page
            className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Digital Books
          </Link>
          <Link
            to="/voice-bot" // Link to the VoiceBot page (Alexa section)
            className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Voice Bot
          </Link>
          <Link
            to="/chat-bot" // Link to the VoiceBot page (Alexa section)
            className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Chat Bot
          </Link>
         
          <a
            href="/aboutus"
            className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            About Us
          </a>
        </nav>

        {/* Auth and Profile Section */}
        <div className="flex gap-6 items-center">
          <SignedOut>
            <SignInButton>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-14 h-14 rounded-full border-2 border-gray-700 hover:border-blue-400 transition-all duration-300",
                  userButtonOuter: "p-2 bg-gray-800 rounded-lg hover:shadow-lg",
                  dropdownMenu: "bg-gray-900 text-gray-100 rounded-lg shadow-lg",
                  dropdownItem: "px-4 py-2 hover:bg-gray-700 rounded-md transition-all duration-300",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-around items-center bg-gray-800 py-2 text-sm font-medium">
        <a href="#contact" className="hover:text-blue-400 transition-all duration-300">
          Contact Us
        </a>
        <a href="#help" className="hover:text-blue-400 transition-all duration-300">
          Help
        </a>
        <a href="#about" className="hover:text-blue-400 transition-all duration-300">
          About
        </a>
      </div>
    </header>
  );
};

export default Header;
