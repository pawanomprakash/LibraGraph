import React, { useRef } from 'react';

// Category data
const categories = [
  { id: 1, name: 'Fiction', image: 'https://th.bing.com/th/id/OIP.fKu9KroDzzTVFQk3q5jC-gHaLX?w=188&h=289&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
  { id: 2, name: 'Science', image: 'https://cdn2.penguin.com.au/covers/original/9781409350156.jpg' },
  { id: 3, name: 'Technology', image: 'https://th.bing.com/th/id/OIP.KXGXvQnZksxzuBbjzqpmtwHaLh?w=188&h=292&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
  { id: 4, name: 'History', image: 'https://th.bing.com/th/id/OIP.P9YLrMwz-THUbrC7Oo8hUAAAAA?w=162&h=192&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
  { id: 5, name: 'Biography', image: 'https://th.bing.com/th/id/OIP.YKMfmtiwurEnx9ertgQg-gHaL6?w=188&h=303&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
  { id: 6, name: 'Fantasy', image: 'https://th.bing.com/th/id/OIP.cvexECPTvVLzlZWuLoaRegHaL2?rs=1&pid=ImgDetMain' },
  { id: 7, name: 'Romance', image: 'https://images.squarespace-cdn.com/content/v1/59e235dcd7bdcec81eb68962/1575860872067-04EH3B6LX0ZNNXH26H88/ke17ZwdGBToddI8pDm48kD755XqWqn8HkRX8WSTt5GJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1URwn7vetbNoOrjGqAVoZN5bz1XPY0_Ev1nDpBBPOnwUda4oDI66FEaoPF3aKRzQZjg/Romance+Unleashed+by+Diana+Plamer.jpg' },
];

const CategoryList = () => {
  const containerRef = useRef(null);

  // Function to scroll the container to the right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll the container to the left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mb-12 relative">
      {/* Left Arrow Button */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-all"
      >
        &#8249;
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-all"
      >
        &#8250;
      </button>

      {/* Scrollable Category Container */}
      <div
        ref={containerRef}
        className="flex space-x-6 overflow-x-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800 smooth-scroll"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 w-48 h-64 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 relative group"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="absolute top-0 left-0 w-full h-40 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg">
              <p className="text-white font-bold text-lg flex items-center justify-center h-full">
                Explore {category.name}
              </p>
            </div>
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
