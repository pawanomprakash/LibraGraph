import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      onSearch(value);
    }, 500); // Adjust debounce delay as needed

    setDebounceTimeout(timeoutId);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search books..."
      className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
};

export default SearchBar;
