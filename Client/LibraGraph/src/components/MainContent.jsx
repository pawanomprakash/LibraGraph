import React from 'react';
import Catalog from './Catalog';
import BorrowBook from './BorrowBook';
import LibraryDashboard from './LibraryDashboard';
import DigitalContent from './DigitalContent';
import NaturalLanguageSearch from './NaturalLanguageSearch';
// import Chatbot from './Chatbot';
import OCR from './OCR';
import VoiceCommands from './VoiceCommands';

const MainContent = () => {
  return (
    <main className="py-8">
      <Catalog />
      <BorrowBook />
      <LibraryDashboard />
      <DigitalContent />
      {/* <NaturalLanguageSearch /> */}
      {/* <Chatbot /> */}
      {/* <OCR />
      <VoiceCommands /> */}
    </main>
  );
};

export default MainContent;
