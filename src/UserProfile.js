import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [updateStatus, setUpdateStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (err) {
        setError('Failed to load profile. Please log in.');
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

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
      setError(null);
      // Refresh profile data
      const updatedProfile = await axios.get('http://localhost:8080/profile', {
        withCredentials: true,
      });
      setProfile(updatedProfile.data);
    } catch (err) {
      setUpdateStatus(null);
      setError('Failed to update mobile number.');
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.Role}</p>
        <p><strong>Mobile Number:</strong> {profile.mobileNumber || 'Not set'}</p>
        <div className="profile-picture">
          <img 
            src={profile.profilePicture} 
            alt="Profile" 
            onError={(e) => e.target.src = 'path/to/default/profile-pic.png'} // Fallback to default image
          />
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
    </div>
  );
};

export default Profile;
