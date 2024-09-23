// src/PrivateRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';
import ConfirmationModal from './ConfirmationModal';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, loading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/');

  useEffect(() => {
    if (!user && !loading) {
      const currentUrl = window.location.pathname;
      localStorage.setItem('redirectAfterLogin', currentUrl);
      setRedirectUrl('/login');
      setIsModalOpen(true);
    }
  }, [user, loading]);

  const handleConfirm = () => {
    setIsModalOpen(false);
    window.location.href = redirectUrl;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) {
    if (isModalOpen) {
      return (
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      );
    }
    return null; // Prevent rendering anything else until the modal interaction
  }

  const userRole = user.Role;

  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    if (userRole === 'ROLE_ADMIN') {
      return <div>You do not have admin permissions to view this page.</div>;
    } else if (userRole === 'ROLE_USER') {
      return <div>You do not have user permissions to view this page.</div>;
    } else {
      return <Navigate to="/403" />;
    }
  }
};

export default PrivateRoute;
