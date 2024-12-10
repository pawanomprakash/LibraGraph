import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component

const Catalog = () => {
  const [books, setBooks] = useState([]); // All books in the catalog
  const [filteredBooks, setFilteredBooks] = useState([]); // Books currently displayed after search/filter
  const [loading, setLoading] = useState(false); // To track if more books are being fetched
  const [page, setPage] = useState(1); // To track the current page for loading books
  
  const booksPerPage = 8; // Number of books to load at once

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  // Function to fetch books from the API
  const fetchBooks = (page) => {
    setLoading(true);
    fetch(`http://localhost:3000/api/books?page=${page}&limit=${booksPerPage}`)
      .then(response => response.json())
      .then(data => {
        setBooks((prevBooks) => [...prevBooks, ...data]); // Append new books to the existing list
        setFilteredBooks((prevBooks) => [...prevBooks, ...data]); // Same for filtered list
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  };

  // Handle search input
  const handleSearch = (query) => {
    if (!query) {
      setFilteredBooks(books); // Show all books if no query
    } else {
      const filtered = books.filter(book =>
        book.name.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  // Detect when the user has scrolled to the bottom of the page
  const handleScroll = useCallback(() => {
    const bottom = document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1); // Load more books when reaching the bottom
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="p-4 bg-black min-h-screen relative">
      {/* Search Bar */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">
        Book Catalog
      </h1>

      {/* Show message if no books are found */}
      {filteredBooks.length === 0 ? (
        <div className="text-center text-xl text-gray-400">
          No books found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="group bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden"
            >
              <img 
                src={book.image_link} 
                alt={book.name} 
                className="w-full h-48 object-contain mb-4 rounded-lg shadow-md"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-100">{book.name}</h2>
              <p className="text-gray-400"><strong>Author:</strong> {book.author}</p>
              <p className="text-gray-400"><strong>ISBN:</strong> {book.ISBN}</p>
              <button 
                onClick={() => window.open(book.amazon_link, '_blank')}
                className="mt-4 px-6 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Buy on Amazon
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center mt-8 text-gray-400">
          <span>Loading more books...</span>
        </div>
      )}
    </div>
  );
};

export default Catalog;
