import React, { useEffect, useState } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import { useUser } from "@clerk/clerk-react"; 

const LandingPage = () => {
  const { isSignedIn, user } = useUser();
  const [username, setUsername] = useState("there");

  useEffect(() => {
    if (isSignedIn) {
      setUsername(user?.firstName || ""); 
    }
  }, [isSignedIn, user]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header /> {/* Pass onSearch function to Header if needed */}
      <MainContent username={username} /> {/* Pass username to MainContent */}
      <Footer />
    </div>
  );
};

export default LandingPage;
