import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-300 py-16">
      <div className="container mx-auto px-6 md:px-12">

        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Branding Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-4xl font-extrabold text-white">LibraGraphAI</h3>
            <p className="text-sm mt-3 text-gray-400 max-w-xs md:max-w-sm text-center md:text-left">
              Empowering libraries with knowledge graphs and AI. Revolutionizing library management and knowledge sharing.
            </p>
          </div>

          {/* Navigation Section */}
          <nav className="flex flex-col space-y-4 md:space-y-2 text-center md:text-left">
            <Link
              to="/books"
              className="text-gray-400 hover:text-gray-100 transition-all duration-300"
            >
              Books
            </Link>
            <Link
              to="/digital-books"
              className="text-gray-400 hover:text-gray-100 transition-all duration-300"
            >
              Digital Books
            </Link>
            <Link
              to="/chat-bot"
              className="text-gray-400 hover:text-gray-100 transition-all duration-300"
            >
              Chat Bot
            </Link>
            <Link
              to="/voice-bot"
              className="text-gray-400 hover:text-gray-100 transition-all duration-300"
            >
              Voice Bot
            </Link>
            <a
              href="/about-us"
              className="text-gray-400 hover:text-gray-100 transition-all duration-300"
            >
              About Us
            </a>
          </nav>

          {/* Follow Us Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Follow Us</h4>
            <div className="flex space-x-6 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 text-center border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} LibraGraphAI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
