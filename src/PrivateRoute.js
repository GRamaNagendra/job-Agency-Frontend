// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) {
    // Save the current URL in a cookie
    const currentFullUrl = `http://localhost:3000${window.location.pathname}`;
    console.log('Current Full URL:', currentFullUrl);
    document.cookie = `originalUrl=${encodeURIComponent(currentFullUrl)}; path=/`;
    
    // Redirect to login
    return <Navigate to="/login" />;
  }

  const userRole = user.Role;

  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    // Redirect based on role
    if (userRole === 'ROLE_ADMIN') {
      return <Navigate to="/not-admin" />;
    } else if (userRole === 'ROLE_USER') {
      return <Navigate to="/not-user" />;
    } else {
      return <Navigate to="/403" />;
    }
  }
};

export default PrivateRoute;
