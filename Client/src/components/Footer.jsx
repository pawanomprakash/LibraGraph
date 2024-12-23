import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for navigation

// Ensure you have FontAwesome icons included in your project. You can include it in your `index.html` or install it via npm/yarn.
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'; // Importing React FontAwesome icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
      <div className="container mx-auto px-6 md:px-12">

        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left Section - Branding */}
          <div className="footer-left flex flex-col items-center md:items-start">
            <h3 className="text-4xl font-extrabold text-white">LibraGraphAI</h3>
            <p className="text-md mt-3 text-gray-200 max-w-xs md:max-w-sm text-center md:text-left">
              Empowering libraries with knowledge graphs and AI. Revolutionizing library management and knowledge sharing.
            </p>
          </div>

          {/* Navigation Section */}
          <nav className="md:flex gap-12 text-lg font-medium text-center md:text-left">
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
              Alexa
            </Link>
           
            
            <a
              href="#about"
              className="hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
            >
              About
            </a>
          </nav>

        </div>

        {/* Footer Bottom Section - Follow Us */}
        <div className="mt-12 text-center md:text-left"> {/* Increased margin for spacing */}
          <div className="footer-right flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-6 text-3xl">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                <FaFacebookF />
              </a>
              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                <FaTwitter />
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-300">© {new Date().getFullYear()} LibraGraphAI. All Rights Reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
