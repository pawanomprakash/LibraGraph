import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/${categoryName}`);
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
    return <div className="flex items-center justify-center h-screen bg-black text-white text-2xl">Loading...</div>;
  }
  
  if (books.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-2xl">
        No books available in this category.
      </div>
    );
  }
  

  // Determine if the category is Fiction to apply specific styling
  const isFiction = categoryName.toLowerCase() === 'fiction';

  return (
    <section className="p-4 bg-black text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Books</h2>
      
      <div
        className={`grid ${isFiction ? 'grid-cols-3 gap-8 justify-center' : 'grid-cols-3 gap-6'} mx-4`}
      >
        {books.map((book) => (
          <div
            key={book.ISBN}
            className="bg-gray-800 p-6 rounded-lg h-100 m-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={book.image_link}
              alt={book.name}
              className="w-full h-64 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{book.name}</h3>
            <p className="text-gray-400">{book.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBooks;
