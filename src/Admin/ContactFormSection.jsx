// src/components/AdminDashboard/ContactFormSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactFormSection = () => {
  const [contactForms, setContactForms] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  // Handle deletion of individual contact form
  const handleDeleteSingleContact = async (contactId) => {
    try {
      await axios.delete(`http://localhost:8080/interaction/contact/delete/${contactId}`, { withCredentials: true });
      // Refresh contact forms list after deletion
      const contactFormResponse = await axios.get('http://localhost:8080/interaction/contact/all', { withCredentials: true });
      setContactForms(contactFormResponse.data);
      setSuccess('Contact form deleted successfully.');
    } catch (err) {
      console.error('Failed to delete contact form', err);
      setError('Failed to delete contact form.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">All Contact Forms</h2>
      {error && <p className="text-lg text-red-600 font-semibold mb-4">{error}</p>}
      {success && <p className="text-lg text-green-600 font-semibold mb-4">{success}</p>}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="px-6 py-4"></th> {/* Empty column for spacing */}
              <th className="px-6 py-4 text-base font-medium">User Email</th>
              <th className="px-6 py-4 text-base font-medium">Message</th>
              <th className="px-6 py-4 text-base font-medium">Mobile Number</th>
              <th className="px-6 py-4 text-center text-base font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactForms.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4"></td> {/* Empty cell for spacing */}
                <td className="px-6 py-4 text-sm font-medium">{item.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{item.message}</td>
                <td className="px-6 py-4 text-sm font-medium">{item.mobileNumber}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteSingleContact(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactFormSection;
