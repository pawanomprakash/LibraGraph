import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Books from './pages/Books'; // Import the Books page
import DigitalBooksPage from './pages/DigitalBooksPage'; // Import the new DigitalBooksPage component
import VoiceBot from './pages/VoiceBot'; // Import the VoiceBot page
import ChatBotPage from './pages/ChatBotPage';

const NotFound = () => {
  return <div className="text-center p-8">404 - Page Not Found</div>;
};

function App() {
  return (
    <>
      {/* Add a simple navigation bar to navigate between pages */}
      <nav>
        <ul className="flex gap-4 p-4 bg-gray-800 text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-400')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-400')}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/digital-books"
              className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-400')}
            >
              Digital Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/voice-bot"
              className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-400')}
            >
              Voice Bot
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat-bot"
              className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-400')}
            >
              ChatBot
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Define routes for the application */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/books" element={<Books />} />
        <Route path="/digital-books" element={<DigitalBooksPage />} />
        <Route path="/voice-bot" element={<VoiceBot />} /> {/* Add VoiceBot route */}
        <Route path="/chat-bot" element={<ChatBotPage />} /> {/* Add ChatBot route */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </>
  );
}

export default App;
