import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import Users from '../Admin/User';
import ContactFormSection from '../Admin/ContactFormSection';
import Feedback from '../Admin/Feedback1';
import Job from '../Admin/Job1';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8080/admin/users', { withCredentials: true });
        setUsers(userResponse.data.users);
        setTotalUsers(userResponse.data.totalUsers);
        setAdminCount(userResponse.data.users.filter(user => user.role === 'ROLE_ADMIN').length);
      } catch (err) {
        setError('Failed to load users.');
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'jobs':
        return <Job />;
      case 'feedback':
        return <Feedback />;
      case 'contact':
        return <ContactFormSection />;
      case 'users':
      default:
        return <Users users={users} setUsers={setUsers} setAdminCount={setAdminCount} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Total Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className="summary-card">
          <h2>Admin Users</h2>
          <p>{adminCount}</p>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="tabs">
        {['users', 'jobs', 'feedback', 'contact'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active-tab' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;
