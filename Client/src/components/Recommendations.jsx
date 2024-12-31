import React, { useEffect, useState } from 'react';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const visitedCategories = JSON.parse(localStorage.getItem('visitedCategories')) || [];
      let recommendedBooks = [];

      for (const category of visitedCategories) {
        try {
          const response = await fetch(`https://libragraph-backend-7yjq.onrender.com/api/${category}`);
          const data = await response.json();
          recommendedBooks = [...recommendedBooks, ...data];
        } catch (error) {
          console.error(`Error fetching books for category ${category}:`, error);
        }
      }

      // Shuffle the recommended books and limit to 20
      recommendedBooks = shuffleArray(recommendedBooks).slice(0, 20);
      setRecommendations(recommendedBooks);
    };

    fetchRecommendations();
  }, []); // Empty dependency array ensures this runs on every mount

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <section className="mb-12">
      <div className="flex space-x-6 py-4 px-2 overflow-x-auto scrollbar-hide">
        {recommendations.length === 0 ? (
          <div className="text-center text-xl text-gray-400">
            Explore to get recommendations
          </div>
        ) : (
          recommendations.map((book) => (
            <div
              key={book.id}
              className="flex-shrink-0 w-48 h-64 rounded-lg shadow-lg bg-gray-700 overflow-hidden"
            >
              <img
                src={book.image_link}
                alt={book.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center text-gray-200 font-semibold">
                {book.name}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Recommendations;

