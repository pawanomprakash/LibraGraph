// src/pages/DigitalBooksPage.jsx
import React from 'react';
import DigitalContent from '../components/DigitalContent'; // Importing the DigitalContent component

const DigitalBooksPage = () => {
  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto py-10">
        <h1 className="text-4xl font-extrabold text-center mb-6">Digital Books</h1>
        
        {/* Here we will use the DigitalContent component to display all digital books */}
        <DigitalContent category="digital-books" />
      </div>
    </div>
  );
};

export default DigitalBooksPage;
