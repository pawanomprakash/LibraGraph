// Catalog.js
import React from 'react';

const Catalog = () => {
  const books = [
    { title: 'Book 1', author: 'Author 1' },
    { title: 'Book 2', author: 'Author 2' },
  ];

  return (
    <div>
      <h2 className="text-2xl">Book Catalog</h2>
      <ul className="list-disc pl-5">
        {books.map((book, index) => (
          <li key={index}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
