import React from 'react';

const categories = [
  { id: 1, name: 'Fiction', image: '/images/fiction.jpg' },
  { id: 2, name: 'Science', image: '/images/science.jpg' },
  { id: 3, name: 'Technology', image: '/images/technology.jpg' },
  { id: 4, name: 'History', image: '/images/history.jpg' },
  { id: 5, name: 'Biography', image: '/images/biography.jpg' },
  { id: 6, name: 'Fantasy', image: '/images/fantasy.jpg' },
  { id: 7, name: 'Romance', image: '/images/romance.jpg' },
  { id: 8, name: 'Self-Help', image: '/images/self-help.jpg' },
  { id: 9, name: 'Mystery', image: '/images/mystery.jpg' },
  { id: 10, name: 'Children’s Books', image: '/images/children.jpg' },
];

const CategoryList = () => {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 w-48 h-64 rounded-lg shadow-lg bg-gray-700 overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center text-gray-200 font-semibold">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
