// Catalog.js
import React from 'react';

const Catalog = () => {
  const books = [
    { title: 'Book 1', author: 'Author 1' },
    { title: 'Book 2', author: 'Author 2' },
    { title: 'Book 3', author: 'Author 3' },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen py-10">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-8 animate__animated animate__fadeInDown">
        Book Catalog
      </h2>
      <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
        {books.map((book, index) => (
          <li
            key={index}
            className="group bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-all duration-300"></div>

            {/* Book Details */}
            <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-white transition-all duration-300">
              {book.title}
            </h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">
              {book.author}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
