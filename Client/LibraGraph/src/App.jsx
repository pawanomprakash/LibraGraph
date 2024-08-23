import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import ChatSection from './components/ChatSection';
import LibraBot from './components/LibraBot';

function App() {
  return (
    <div className="flex overflow-hidden flex-col pt-3.5 bg-black border border-solid border-slate-100 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <Header />
      <MainContent />
      <ChatSection />
      <LibraBot />
    </div>
  );
}

export default App;