import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext([]);

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles from backend API
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/roles', {
          credentials: 'include' // Include cookies with the request
        });
        if (response.ok) {
          const data = await response.json();
          setRoles(data.roles); // Assuming the response has a 'roles' field
          console.log('Roles fetched:', data.roles);
        } else {
          console.log('Failed to fetch roles');
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <RoleContext.Provider value={roles}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => useContext(RoleContext);
