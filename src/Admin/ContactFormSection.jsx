// src/components/AdminDashboard/ContactFormSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactFormSection = () => {
  const [contactForms, setContactForms] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch contact forms on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactFormResponse = await axios.get('http://localhost:8080/interaction/contact/all', { withCredentials: true });
        setContactForms(contactFormResponse.data);
      } catch (err) {
        setError('Failed to load contact forms.');
        console.error(err);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContactForms = async () => {
    try {
      await axios.delete('http://localhost:8080/interaction/contact', {
        data: { ids: selectedContacts },
        withCredentials: true,
      });
      // Refresh contact forms list
      const contactFormResponse = await axios.get('http://localhost:8080/interaction/contact/all', { withCredentials: true });
      setContactForms(contactFormResponse.data);
      setSelectedContacts([]); // Reset selection
    } catch (err) {
      console.error('Failed to delete contact forms', err);
      setError('Failed to delete selected contact forms.');
    }
  };

  const toggleSelectContact = (contactId) => {
    setSelectedContacts(prevSelected => 
      prevSelected.includes(contactId) 
        ? prevSelected.filter(id => id !== contactId) 
        : [...prevSelected, contactId]
    );
  };

  return (
    <div className="contact-list">
      <h2>All Contact Forms</h2>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleDeleteContactForms} disabled={selectedContacts.length === 0}>
        Delete Selected Contacts
      </button>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>User Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactForms.map(item => (
            <tr key={item.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedContacts.includes(item.id)} 
                  onChange={() => toggleSelectContact(item.id)} 
                />
              </td>
              <td>{item.userEmail}</td>
              <td>{item.message}</td>
              <td>
                <button>Reply</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactFormSection;
