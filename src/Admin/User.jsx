import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Users = ({ users, setUsers }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({});
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    users.forEach(user => {
      loadImage(user.id, user.profilePicture, 3);
    });
    AOS.init({ duration: 1000, once: true });
  }, [users]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

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
        loadImage(userId, imageUrl, retries - 1);
      }, 5000);
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

 // New method to delete selected users
 const handleDeleteSelectedUsers = async () => {
  if (selectedUsers.length === 0) {
    setError('No users selected for deletion');
    return;
  }

  try {
    // Make a DELETE request with the selected user IDs
    await axios.delete('http://localhost:8080/admin/users/delete-selected', {
      data: selectedUsers, // Send the selected user IDs as the request body
      withCredentials: true,
    });
    await refreshUsers(); // Refresh the user list after deletion
    setSelectedUsers([]); // Clear the selected users
  } catch (err) {
    console.error('Failed to delete selected users:', err);
    setError('Failed to delete selected users.');
  }
};


  const refreshUsers = async () => {
    try {
      const userResponse = await axios.get('http://localhost:8080/admin/users', { withCredentials: true });
      setUsers(userResponse.data.users);
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
    <div className="user-list p-4 sm:p-6 bg-white rounded-lg shadow-lg mt-5" data-aos="fade-up">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">User Management</h2>
      
      {error && <p className="alert alert-danger mb-4 text-red-600">{error}</p>}
      
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center sm:justify-between">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            className="form-input w-full sm:w-1/2 p-2 border rounded-md"
            placeholder="Search by Username or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <button
          onClick={handleDeleteSelectedUsers}
          disabled={selectedUsers.length === 0}
          className="mt-2 sm:mt-0 btn btn-danger px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
          Delete Selected Users
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 text-sm sm:text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length}
                  onChange={() => {
                    if (selectedUsers.length === filteredUsers.length) {
                      setSelectedUsers([]);
                    } else {
                      setSelectedUsers(filteredUsers.map(user => user.id));
                    }
                  }}
                  className="form-check-input"
                />
              </th>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2 hidden md:table-cell">Mobile Number</th>
              <th className="p-2">Role</th>
              <th className="p-2 hidden md:table-cell">Last Login</th>
              <th className="p-2 hidden sm:table-cell">Profile Picture</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-600">No users found</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className="form-check-input"
                    />
                  </td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 hidden md:table-cell">{user.mobilenumber}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2 hidden md:table-cell">{user.lastLogin}</td>
                  <td className="p-2 hidden sm:table-cell">
                    <img
                      src={imageLoaded[user.id] ? user.profilePicture : "defaultImage.jpg"}
                      alt="Profile"
                      className="rounded-full w-10 h-10"
                      onError={() => setImageLoaded((prev) => ({ ...prev, [user.id]: false }))}
                    />
                  </td>
                  <td className="p-2">
                    {user.role === 'ROLE_ADMIN' ? (
                      <button
                        onClick={() => handleAssignRole(user.email, 'ROLE_USER')}
                        className="btn btn-warning btn-sm"
                      >
                        <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                        Revoke Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAssignRole(user.email, 'ROLE_ADMIN')}
                        className="btn btn-success btn-sm"
                      >
                        <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
