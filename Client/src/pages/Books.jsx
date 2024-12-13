import React from 'react';
import CatalogPage from './CatalogPage';

const Books = () => {
  return (
    <main className="py-12 px-6 bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto space-y-16 w-full">

        {/* Books Page Title */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Library Catalog</h1>
          <p className="text-lg text-gray-300">
            Explore all available books in our collection.
          </p>
        </header>

        {/* Catalog Section */}
        <section className="space-y-8">
          <CatalogPage />
        </section>
      </div>
    </main>
  );
};

export default Books;
