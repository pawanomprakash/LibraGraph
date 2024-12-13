import React from 'react';

const recommendations = [
  { id: 1, title: 'The Alchemist', image: '/images/alchemist.jpg' },
  { id: 2, title: 'Sapiens', image: '/images/sapiens.jpg' },
  { id: 3, title: 'Clean Code', image: '/images/clean-code.jpg' },
  { id: 4, title: 'Atomic Habits', image: '/images/atomic-habits.jpg' },
  { id: 5, title: 'Harry Potter', image: '/images/harry-potter.jpg' },
  { id: 6, title: 'The Great Gatsby', image: '/images/gatsby.jpg' },
  { id: 7, title: 'The Pragmatic Programmer', image: '/images/pragmatic.jpg' },
  { id: 8, title: 'To Kill a Mockingbird', image: '/images/mockingbird.jpg' },
  { id: 9, title: 'Think and Grow Rich', image: '/images/think-grow-rich.jpg' },
  { id: 10, title: 'The Book Thief', image: '/images/book-thief.jpg' },
];

const Recommendations = () => {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
      <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
        {recommendations.map((book) => (
          <div
            key={book.id}
            className="flex-shrink-0 w-48 h-64 rounded-lg shadow-lg bg-gray-700 overflow-hidden"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center text-gray-200 font-semibold">
              {book.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
