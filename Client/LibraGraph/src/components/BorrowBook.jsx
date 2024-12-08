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
    <div>
      <button onClick={borrowed ? handleReturn : handleBorrow} className="bg-blue-500 text-white py-2 px-4 rounded">
        {borrowed ? 'Return Book' : 'Borrow Book'}
      </button>
    </div>
  );
};

export default BorrowBook;
