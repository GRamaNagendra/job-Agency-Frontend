import React from 'react';

const LogoutPage = () => {
  const handleLogout = () => {
    // Clear any session-related cookies (if necessary)
    document.cookie = 'redirectUrl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Redirect to backend logout endpoint
    window.location.href = 'http://localhost:8080/logout';  // Adjust the URL to your actual logout endpoint
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h1 className="logout-title">Logout Successful</h1>
        <p className="logout-text">You have been successfully logged out. Click below to return to the homepage.</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
