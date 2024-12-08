const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    console.log('Searching for: ', query);
    // Implement actual search functionality here
  };
  
  // Inside your Header component
  <form onSubmit={handleSearch} className="flex items-center bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
    <label htmlFor="search" className="sr-only">Search</label>
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Search for books..."
      className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
    />
  </form>
  