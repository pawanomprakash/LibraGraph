// BorrowBook.js
import React, { useState } from 'react';

const BorrowBook = () => {
  const [borrowed, setBorrowed] = useState(false);

  const handleBorrow = () => {
    setBorrowed(true);
    alert('Book Borrowed');
  };

  const handleReturn = () => {
    setBorrowed(false);
    alert('Book Returned');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <button
        onClick={borrowed ? handleReturn : handleBorrow}
        className={`relative px-8 py-3 text-lg font-semibold text-gray-100 rounded-full transition-all duration-300 shadow-md 
          ${borrowed ? 'bg-gradient-to-r from-green-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'}
          hover:scale-105 hover:shadow-lg
        `}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 transition-opacity duration-300 hover:opacity-20"></span>
        {borrowed ? 'Return Book' : 'Borrow Book'}
      </button>
    </div>
  );
};

export default BorrowBook;
