import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Admin.css'

const Users = ({ users, setUsers, setAdminCount }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    users.forEach(user => {
      loadImage(user.id, user.profilePicture, 3);
    });
  }, [users]);

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
        loadImage(userId, imageUrl, retries - 1);  // Retry loading image after a delay
      }, 5000);  // 5 seconds delay before retry
    } else {
      setImageLoaded((prev) => ({ ...prev, [userId]: false }));
    }
  }, [loadImage]);

  const handleAssignRole = async (email, role) => {
    try {
      await axios.put('http://localhost:8080/admin/assign-role', { email, role }, { withCredentials: true });
      await refreshUsers();
    } catch (err) {
      console.error('Error assigning role:', err.response || err);
      setError(`Failed to assign role: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleDeleteSelectedUsers = async () => {
    try {
      await axios.delete('http://localhost:8080/admin/users', { data: { ids: selectedUsers }, withCredentials: true });
      await refreshUsers();
      setSelectedUsers([]);  // Reset selected users after deletion
    } catch (err) {
      console.error('Failed to delete users', err);
      setError('Failed to delete selected users.');
    }
  };

  const refreshUsers = async () => {
    try {
      const userResponse = await axios.get('http://localhost:8080/admin/users', { withCredentials: true });
      setUsers(userResponse.data.users);
      setAdminCount(userResponse.data.users.filter(user => user.role === 'ROLE_ADMIN').length);
    } catch (err) {
      console.error('Error refreshing users:', err);
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) => (
      prevSelected.includes(userId) ? prevSelected.filter(id => id !== userId) : [...prevSelected, userId]
    ));
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleDeleteSelectedUsers} disabled={selectedUsers.length === 0}>
        Delete Selected Users
      </button>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Role</th>
            <th>Last Login</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleSelectUser(user.id)}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobilenumber}</td>
              <td>{user.role}</td>
              <td>{user.lastLogin}</td>
              <td>
                <img
                  src={imageLoaded[user.id] ? user.profilePicture : "defaultImage.jpg"}  // Fallback to default image if loading fails
                  alt="Profile"
                  className="usersimage"
                  width="50"
                  onError={() => setImageLoaded((prev) => ({ ...prev, [user.id]: false }))}  // Handle missing image by switching to default
                />
              </td>
              <td>
                {user.role === 'ROLE_ADMIN' ? (
                  <button onClick={() => handleAssignRole(user.email, 'ROLE_USER')}>Revoke Admin</button>
                ) : (
                  <button onClick={() => handleAssignRole(user.email, 'ROLE_ADMIN')}>Make Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
