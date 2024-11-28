// src/components/LoadingSpinner.js
import React from 'react';
//import './LoadingSpinner.css'; // Create CSS for styling

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
        {/* Basic spinner implementation */}
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
