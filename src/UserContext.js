// src/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the context
const UserContext = createContext();

// UserProvider component to provide context to the application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profile', {
          withCredentials: true,
        });
        setUser(response.data); // Adjust based on your API response
        console.log('User role:', response.data.Role); // Print user role
      } catch (err) {
        console.error('Failed to fetch user profile', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Named export for useUser
export const useUser = () => useContext(UserContext);
