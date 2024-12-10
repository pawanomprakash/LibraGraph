import React, { useState, useEffect } from 'react';

const Catalog = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data)) 
      .catch(err => console.error('Error fetching books:', err)); 
  }, []);

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
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-all duration-300"></div>

            <img
              src={book.image_link} 
              alt={book.name}
              className="w-full h-64 object-cover mb-4 rounded-xl"
            />
            <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-white transition-all duration-300">
              {book.name} 
            </h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">
              {book.author} 
            </p>
            <p className="text-gray-500 mt-2">
              ISBN: {book.ISBN} 
            </p>
            <a
              href={book.amazon_link} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline mt-2 block"
            >
              Buy on Amazon
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
