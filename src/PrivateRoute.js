import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// PrivateRoute component for protecting routes
const PrivateRoute = ({ element }) => {
  const isAuthenticated = () => !!localStorage.getItem('authToken');

  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
