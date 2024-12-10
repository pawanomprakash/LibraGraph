import React from 'react';
import Header from './Header';
import MainContent from './MainContent';

const LandingPage = ()=>{
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
          <Header />
          <MainContent />
        </div>
      );
}

export default LandingPage