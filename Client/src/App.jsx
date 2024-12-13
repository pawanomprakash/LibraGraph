import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Books from './pages/Books'; // Import the Books page
import DigitalBooksPage from './pages/DigitalBooksPage'; // Import the new DigitalBooksPage component

function App() {
  return (
    <>
      {/* Add a simple navigation bar to navigate between pages */}
      <nav>
        <ul className="flex gap-4 p-4 bg-gray-800 text-white">
          <li>
            <Link to="/" className="hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/books" className="hover:text-blue-400">Books</Link> {/* Link to Books page */}
          </li>
          <li>
            <Link to="/digital-books" className="hover:text-blue-400">Digital Books</Link> {/* Link to Digital Books page */}
          </li>
        </ul>
      </nav>

      {/* Define routes for the application */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/books" element={<Books />} /> {/* Add Books page route */}
        <Route path="/digital-books" element={<DigitalBooksPage />} /> {/* Add Digital Books page route */}
      </Routes>
    </>
  );
}

export default App;
