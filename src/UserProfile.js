import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './UserProfile.css';


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [mobileNumber, setMobileNumber] = useState('');
  const [updateStatus, setUpdateStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [feedbackError, setFeedbackError] = useState(null);



  // Load profile and feedback data
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/profile', {
          withCredentials: true,
        });
        setProfile(response.data);
        setMobileNumber(response.data.mobileNumber || '');
        setIsLoading(false);

        const feedbackResponse = await axios.get('http://localhost:8080/interaction/feedback/user', {
          params: { email: response.data.email },
        });
        setSubmittedFeedback(feedbackResponse.data.length > 0 ? feedbackResponse.data[0] : null);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Load images for the profile
  useEffect(() => {
    if (profile) {
      loadImage(profile.id, profile.profilePicture, 3);
    }
  }, [profile]);

  // Helper function to load images with retries
  const loadImage = useCallback((userId, imageUrl, retries) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => handleImageLoad(userId);
    img.onerror = () => handleImageError(userId, imageUrl, retries);
  }, []);

  const handleImageLoad = useCallback((userId) => {
    setImageLoaded((prev) => ({ ...prev, [userId]: true }));
  }, []);

  const handleImageError = useCallback((userId, imageUrl, retries) => {
    if (retries > 0) {
      setTimeout(() => {
        setImageLoaded((prev) => ({ ...prev, [userId]: false }));
        loadImage(userId, imageUrl, retries - 1); // Retry loading image
      }, 5000); // Retry after 5 seconds
    } else {
      setImageLoaded((prev) => ({ ...prev, [userId]: false }));
    }
  }, [loadImage]);

  const handleMobileUpdate = async () => {
    if (!mobileNumber.trim()) {
      alert('Mobile number cannot be empty.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/update',
        null,
        { params: { mobileNumber: mobileNumber }, withCredentials: true }
      );
      setUpdateStatus('Mobile number updated successfully');
    } catch (err) {
      setUpdateStatus(null);
      console.error(err);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      alert('Feedback cannot be empty.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/interaction/feedback/submit', null, {
        params: { message: feedback, email: profile.email },
        withCredentials: true,
      });
      setSubmittedFeedback({ message: feedback });
      setFeedback('');
      alert('Feedback submitted successfully!');
    } catch (err) {
      setFeedbackError('Failed to submit feedback.');
      console.error(err);
    }
  };

  const handleFeedbackUpdate = async () => {
    if (!submittedFeedback || !feedback.trim()) {
      alert('Feedback cannot be empty.');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/interaction/feedback/update/${submittedFeedback.id}`, null, {
        params: { message: feedback, email: profile.email },
        withCredentials: true,
      });
      setSubmittedFeedback({ ...submittedFeedback, message: feedback });
      setFeedback('');
      alert('Feedback updated successfully!');
    } catch (err) {
      setFeedbackError('Failed to update feedback.');
      console.error(err);
    }
  };

 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container" data-aos="fade-up">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-picture">
          <img
            src={imageLoaded[profile.id] ? profile.profilePicture : "defaultImage.jpg"}
            alt="Profile"
            width="150"
            onError={() => setImageLoaded((prev) => ({ ...prev, [profile.id]: false }))}
          />
        </div>

        
        <div className="profile-info">
        <p>
    <strong>Name:</strong>
    <span className="profile-name">{profile.name}</span>
  </p>
  <p>
    <strong>Email:</strong>
    <span className="profile-email">{profile.email}</span>
  </p>
  <p><strong>Role:</strong> {profile.Role}</p>
  <p><strong>Mobile Number:</strong> {profile.mobileNumber || 'Not set'}</p>
 </div>



      </div>

      <div className="mobile-update">
        <h3>Update Mobile Number</h3>
        <input
          type="text"
          placeholder="Enter new mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <button onClick={handleMobileUpdate}>Update Mobile Number</button>
        {updateStatus && <p className="update-status">{updateStatus}</p>}
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h3>{submittedFeedback ? 'Update Feedback' : 'Submit Feedback'}</h3>
        <textarea
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button onClick={submittedFeedback ? handleFeedbackUpdate : handleFeedbackSubmit}>
          {submittedFeedback ? 'Update Feedback' : 'Submit Feedback'}
        </button>
        {feedbackError && <p className="error">{feedbackError}</p>}
        {submittedFeedback && <p><strong>Your Feedback:</strong> {submittedFeedback.message}</p>}
      </div>
    </div>
  );
};

export default Profile;
