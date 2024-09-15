import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});
  const [error, setError] = useState(null);
  const [roleEmail, setRoleEmail] = useState('');
  const [adminCount, setAdminCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsersAndJobs = async () => {
      try {
        // Fetch users
        const userResponse = await axios.get('http://localhost:8080/admin/users', { withCredentials: true });
        setUsers(userResponse.data.users);
        setTotalUsers(userResponse.data.totalUsers);
        setAdminCount(userResponse.data.users.filter(user => user.role === 'ROLE_ADMIN').length);

        // Fetch jobs
        const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
        setJobs(jobResponse.data.data);

        // Fetch job applications for each job
        const applicationsData = {};
        for (const job of jobResponse.data.data) {
          const appResponse = await axios.get(`http://localhost:8080/job-postings/${job.id}/applications`, { withCredentials: true });
          applicationsData[job.id] = appResponse.data.data;
        }
        setApplications(applicationsData);
      } catch (err) {
        setError('Failed to load users, jobs, or applications.');
        console.error(err);
      }
    };

    fetchUsersAndJobs();
  }, []);

  const handleAssignRole = async () => {
    if (!roleEmail) {
      setError('Email cannot be empty.');
      return;
    }

    try {
      await axios.put('http://localhost:8080/admin/assign-role', { email: roleEmail }, { withCredentials: true });
      setRoleEmail('');
      const userResponse = await axios.get('http://localhost:8080/admin/users', { withCredentials: true });
      setUsers(userResponse.data.users);
      setAdminCount(userResponse.data.users.filter(user => user.role === 'ROLE_ADMIN').length);
    } catch (err) {
      console.error('Error assigning role:', err.response || err);
      setError(`Failed to assign role: ${err.response?.data?.message || 'Unknown error'}`);
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

      <div className="assign-role">
        <h2>Assign Admin Role</h2>
        <input
          type="email"
          placeholder="Enter user email"
          value={roleEmail}
          onChange={(e) => setRoleEmail(e.target.value)}
        />
        <button onClick={handleAssignRole}>Assign Role</button>
      </div>

      <div className="user-list">
        <h2>User List</h2>
        {error && <p className="error-message">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Profile Picture</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobilenumber}</td>
                <td>{user.role}</td>
                <td>{user.lastLogin}</td>
                <td><img src={user.profilePicture} alt="Profile" width="50" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="job-list">
        <h2>Job List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Company Name</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Applications</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>
                  {applications[job.id] ? (
                    <ul>
                      {applications[job.id].map(app => (
                        <li key={app.id}>{app.applicantEmail}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No applications yet.</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
