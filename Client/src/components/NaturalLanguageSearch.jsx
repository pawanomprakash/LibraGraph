import React, { useState } from 'react';

const NaturalLanguageSearch = () => {
  const [query, setQuery] = useState('');

  const handleNLSearch = () => {
    if (query.trim()) {
      console.log('Searching with NLP: ', query);
      alert(`Searching for: "${query}"`);
    } else {
      alert('Please enter a query to search.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-purple-700 via-blue-800 to-indigo-900 rounded-lg shadow-lg">
      <h2 className="text-2xl text-gray-100 mb-4 font-bold">Natural Language Search</h2>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3 px-4 text-gray-200 placeholder-gray-400 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleNLSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-gray-100 py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default NaturalLanguageSearch;
