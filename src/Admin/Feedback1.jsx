import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [error, setError] = useState(null);

  // Fetch feedback on component mount
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackResponse = await axios.get('http://localhost:8080/interaction/feedback/all', { withCredentials: true });
        setFeedback(feedbackResponse.data);
      } catch (err) {
        setError('Failed to load feedback.');
        console.error(err);
      }
    };

    fetchFeedback();
  }, []);

  const handleDeleteFeedback = async () => {
    try {
      await axios.delete('http://localhost:8080/interaction/feedback', {
        data: { ids: selectedFeedback },
        withCredentials: true,
      });
      // Refresh feedback list
      const feedbackResponse = await axios.get('http://localhost:8080/interaction/feedback/all', { withCredentials: true });
      setFeedback(feedbackResponse.data);
      setSelectedFeedback([]); // Reset selection
    } catch (err) {
      console.error('Failed to delete feedback', err);
      setError('Failed to delete selected feedback.');
    }
  };

  const toggleSelectFeedback = (feedbackId) => {
    setSelectedFeedback(prevSelected => 
      prevSelected.includes(feedbackId) 
        ? prevSelected.filter(id => id !== feedbackId) 
        : [...prevSelected, feedbackId]
    );
  };

  return (
    <div className="feedback-list">
      <h2>All Feedback</h2>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleDeleteFeedback} disabled={selectedFeedback.length === 0}>
        Delete Selected Feedback
      </button>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Last Login</th>
            <th>Profile Picture</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map(item => (
            <tr key={item.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedFeedback.includes(item.id)} 
                  onChange={() => toggleSelectFeedback(item.id)} 
                />
              </td>
              <td>{item.user.username}</td>
              <td>{item.user.role}</td>
              <td>{item.user.email}</td>
              <td>{item.user.mobilenumber}</td>
              <td>{item.user.lastLogin}</td>
              <td>
                {item.user.profilePicture ? (
                  <img src={item.user.profilePicture} alt="Profile" width="50" height="50" />
                ) : (
                  'No Picture'
                )}
              </td>
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

export default Feedback;
