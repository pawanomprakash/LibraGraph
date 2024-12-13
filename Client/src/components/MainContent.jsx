import React from 'react';
import Catalog from './Catalog';
import DigitalContent from './DigitalContent';
import NaturalLanguageSearch from './NaturalLanguageSearch';
import Chatbot from './SmartChatbot';
import VoiceCommands from './VoiceCommands';
import CategoryList from './CategoryList';
import Recommendations from './Recommendations';

const MainContent = () => {
  return (
    <main className="py-12 px-6 bg-black text-gray-100 min-h-screen">
      <div className="container mx-auto space-y-12 w-full">
        {/* Categories Section */}
        <CategoryList />

        {/* Recommendations Section */}
        <Recommendations />

        {/* Other Sections */}
        <section className="bg-gray-800 p-8 rounded-lg shadow-md">
          <Catalog />
        </section>
        
        <section className="bg-gray-800 p-8 rounded-lg shadow-md">
          <DigitalContent />
        </section>
        <section className="bg-gray-800 p-8 rounded-lg shadow-md">
          <NaturalLanguageSearch />
        </section>
        <section className="bg-gray-800 p-8 rounded-lg shadow-md">
          <VoiceCommands />
        </section>
      </div>

      {/* Chatbot Section, fixed at the bottom right */}
      <div className="fixed bottom-8 right-8 w-72 bg-gray-800 p-6 rounded-lg shadow-md">
        <Chatbot />
      </div>
    </main>
  );
};

export default MainContent;
