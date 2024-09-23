// src/ConfirmationModal.js
import React from 'react';
import './ConfirmationModal.css'; // Make sure this CSS file exists and is properly linked

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Confirmation</h2>
        </div>
        <div className="modal-body">
          <p>Do you want to proceed to the login page?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-confirm" onClick={onConfirm}>Yes</button>
          <button className="btn-cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
