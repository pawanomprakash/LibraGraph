import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer'

const LandingPage = ()=>{
 
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />  {/* Pass onSearch function to Header */}
      <MainContent />  {/* Pass searchQuery to MainContent */}
      <Footer />
    </div>
  );
};

export default LandingPage