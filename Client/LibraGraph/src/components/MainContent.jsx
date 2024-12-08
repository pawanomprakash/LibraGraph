import React from 'react';

const MainContent = () => {
  return (
    <main className="flex flex-col items-center px-6 py-10 bg-gray-800 text-gray-100">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Meet Our AI Librarian for Instant Help!
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Search for books, get personalized recommendations, and manage your library seamlessly.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="flex flex-wrap gap-8 justify-center mt-16 max-w-4xl">
        <div className="p-6 bg-gray-700 rounded-lg shadow-lg text-center w-60">
          <h3 className="text-xl font-semibold mb-3">Search Books</h3>
          <p className="text-gray-300">Quickly search and find your favorite books using our smart search.</p>
        </div>
        <div className="p-6 bg-gray-700 rounded-lg shadow-lg text-center w-60">
          <h3 className="text-xl font-semibold mb-3">Recommendations</h3>
          <p className="text-gray-300">Get AI-driven personalized book recommendations.</p>
        </div>
        <div className="p-6 bg-gray-700 rounded-lg shadow-lg text-center w-60">
          <h3 className="text-xl font-semibold mb-3">Manage Library</h3>
          <p className="text-gray-300">Easily keep track of your library and borrowing history.</p>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
