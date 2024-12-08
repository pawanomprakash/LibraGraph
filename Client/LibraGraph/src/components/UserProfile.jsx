// UserProfile.js
import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Handle login logic here
    setUser({ name: 'John Doe' });
  };

  return (
    <div className="flex items-center">
      {user ? (
        <div>
          <span>{user.name}</span>
          <button onClick={() => setUser(null)} className="ml-2 text-red-500">Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="text-blue-500">Login</button>
      )}
    </div>
  );
};

export default UserProfile;
