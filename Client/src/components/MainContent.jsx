
import React  from 'react';
import Catalog from './Catalog';
import BorrowBook from './BorrowBook';
import LibraryDashboard from './LibraryDashboard';
import DigitalContent from './DigitalContent';
 import NaturalLanguageSearch from './NaturalLanguageSearch';
 import Chatbot from './SmartChatbot';

 import VoiceCommands from './VoiceCommands';

const MainContent = () => {
  
  return (
    <main className="py-12 px-6 bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto space-y-12">
        <section className="bg-gradient-to-r from-purple-600 to-indigo-500 p-8 rounded-lg shadow-lg">
        <Catalog  />
        </section>
        <section className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 rounded-lg shadow-lg">
          <BorrowBook />
        </section>
        <section className="bg-gradient-to-r from-green-500 to-teal-500 p-8 rounded-lg shadow-lg">
          <LibraryDashboard />
        </section>
        <section className="bg-gradient-to-r from-pink-500 to-purple-700 p-8 rounded-lg shadow-lg">
          <DigitalContent />
        </section>
       
         <section className="bg-gradient-to-r from-yellow-500 to-orange-600 p-8 rounded-lg shadow-lg">
          <NaturalLanguageSearch />
        </section>
        
        <section className="bg-gradient-to-r from-gray-700 to-gray-900 p-8 rounded-lg shadow-lg">
          <Chatbot />
        </section>
        
        <section className="bg-gradient-to-r from-teal-400 to-blue-500 p-8 rounded-lg shadow-lg">
          <VoiceCommands />
        </section> 
      </div>
    </main>
  );
};

export default MainContent;
