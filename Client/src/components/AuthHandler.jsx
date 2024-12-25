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
            await axios.post('http://localhost:3000/api/auth/saveUser', {
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
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-medium">Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Welcome to LibraGraph AI</h1>
      <p className="text-lg mb-6">Sign in to access your personalized library experience!</p>

      <SignInButton>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
};

export default AuthHandler;
