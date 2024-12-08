// NaturalLanguageSearch.js
import React from 'react';

const NaturalLanguageSearch = () => {
  const handleNLSearch = (query) => {
    // This function can be connected to an NLP backend to process queries
    console.log('Searching with NLP: ', query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ask me something..."
        onBlur={(e) => handleNLSearch(e.target.value)}
        className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default NaturalLanguageSearch;
