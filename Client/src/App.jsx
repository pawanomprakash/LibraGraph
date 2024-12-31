import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Books from './pages/Books'; // Import the Books page
import DigitalBooksPage from './pages/DigitalBooksPage'; // Import the new DigitalBooksPage component
import VoiceBot from './pages/VoiceBot'; // Import the VoiceBot page
import ChatBotPage from './pages/ChatBotPage';
import CategoryBooks from './components/CategoryBooks'; // Import the CategoryBooks component
import AuthHandler from './components/AuthHandler';
import AboutUs from './components/AboutUs';
const NotFound = () => {
  return <div className="text-center p-8">404 - Page Not Found</div>;
};

function App() {
  return (
    <>
      {/* Add a simple navigation bar to navigate between pages */}
      

      {/* Define routes for the application */}
      <Routes>
        <Route path="/" exact element={<AuthHandler />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/books" element={<Books />} />
        <Route path="/digital-books" element={<DigitalBooksPage />} />
        <Route path="/voice-bot" element={<VoiceBot />} /> {/* Add VoiceBot route */}
        <Route path="/chat-bot" element={<ChatBotPage />} /> {/* Add ChatBot route */}
        <Route path="/about-us" element={<AboutUs />} /> {/* Add ChatBot route */}
        <Route path="/category/:categoryName" element={<CategoryBooks />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </>
  );
}

export default App;
