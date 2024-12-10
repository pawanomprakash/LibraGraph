import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data); // Initially set all books
      })
      .catch(err => console.error('Error fetching books:', err));
  }, []);

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

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="p-4 bg-gradient-to-r from-purple-700 via-blue-600 to-teal-500 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Book Catalog
      </h1>
      
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Show message if no books are found */}
      {filteredBooks.length === 0 ? (
        <div className="text-center text-xl text-white">
          No books found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book, index) => (
            <div
              key={index}
              className="group bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
            >
              <img 
                src={book.image_link} 
                alt={book.name} 
                className="w-full h-48 object-contain mb-4 rounded-lg" 
              />
              <h2 className="text-xl font-semibold mb-2 text-white">{book.name}</h2>
              <p className="text-gray-300"><strong>Author:</strong> {book.author}</p>
              <p className="text-gray-300"><strong>ISBN:</strong> {book.ISBN}</p>
              <button 
                onClick={() => window.open(book.amazon_link, '_blank')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Buy on Amazon
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-500"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-2 ${currentPage === index + 1 ? 'bg-purple-600' : 'bg-gray-600'} text-white rounded-lg hover:bg-purple-700`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Catalog;
