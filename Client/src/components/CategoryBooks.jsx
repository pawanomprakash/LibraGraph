import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://libragraph-backend-7yjq.onrender.com/api/${categoryName}`);
        const data = await response.json();
        console.log(data); // Log the data to see if books are returned
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-2xl">
        No books available in this category.
      </div>
    );
  }

  const isFiction = categoryName.toLowerCase() === 'fiction';

  return (
    <section className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center capitalize">
        {categoryName} Books
      </h2>

      <div
        className={`grid ${
          isFiction ? 'grid-cols-3' : 'grid-cols-2'
        } gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
      >
        {books.map((book) => (
          <div
            key={book.ISBN}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={book.image_link}
              alt={book.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{book.name}</h3>
              <p className="text-gray-400">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBooks;
