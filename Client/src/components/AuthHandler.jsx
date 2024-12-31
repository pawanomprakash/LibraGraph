import React, { useEffect, useState } from 'react';
import { useAuth, useUser, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthHandler = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser(); // Get the user details from Clerk
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        // Send user data to the backend
        const saveUser = async () => {
          try {
            await axios.post('https://libragraph-backend-7yjq.onrender.com/api/auth/saveUser', {
              email: user?.emailAddresses[0]?.emailAddress,
              firstName: user?.firstName,
              lastName: user?.lastName,
              externalId: user?.id,
            });
          } catch (error) {
            console.error("Error saving user:", error.message);
          }
        };

        saveUser();
        navigate('/Landingpage'); // Redirect to /Landingpage after saving user
      } else {
        setLoading(false); // Stop loading if the user is not signed in
      }
    }
  }, [isSignedIn, isLoaded, navigate, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <p className="text-lg font-medium text-gray-300">Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200 px-6 sm:px-12 md:px-24">
      {/* Logo Section */}
      <div className="mb-8">
        {/* Making the logo round */}
        <img 
          src="https://static.wixstatic.com/media/9ba547_f7c0ef7b31e2498e8b0e819ae7986fa1~mv2.jpg/v1/fill/w_85,h_79,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/BroadrangeAI_logo.jpg" 
          alt="LibraGraph AI Logo" 
          className="w-32 h-32 object-cover rounded-full border-4 border-gray-500 shadow-lg" 
        />
      </div>

      <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
        Welcome to LibraGraph AI
      </h1>
      <p className="text-lg mb-8 text-center max-w-lg text-gray-300">
        Sign in to access your personalized library experience! We use cutting-edge AI technology to enhance your knowledge management journey.
      </p>

      <SignInButton>
        <button className="px-8 py-3 bg-gray-700 text-gray-200 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300">
          Sign In
        </button>
      </SignInButton>

      <div className="mt-12 text-center text-gray-400 text-sm">
        <p>Need an account? <a href="/signup" className="text-gray-300 hover:underline">Sign up here</a></p>
      </div>
    </div>
  );
};

export default AuthHandler;
