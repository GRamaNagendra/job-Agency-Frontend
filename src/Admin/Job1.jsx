// src/components/AdminDashboard/Job.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Job.css';

const Job = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [newJob, setNewJob] = useState({ title: '', description: '', companyName: '', location: '', salary: '', category: '' });
  const [error, setError] = useState({ title: '', description: '', companyName: '', category: '', general: '' });
  const [updateStatus, setUpdateStatus] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [jobCategory, setJobCategory] = useState('');

  // Fetch jobs and applications on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
        setJobs(jobResponse.data.data);

        const applicationsData = {};
        for (const job of jobResponse.data.data) {
          const appResponse = await axios.get(`http://localhost:8080/job-postings/${job.id}/applications`, { withCredentials: true });
          applicationsData[job.id] = appResponse.data.data;
        }
        console.log(applicationsData); // Debugging applications data
        setApplications(applicationsData);
      } catch (err) {
        setError({ ...error, general: 'Failed to load jobs.' });
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  const toggleJobLiveStatus = async (jobId, currentStatus) => {
    const newStatus = !currentStatus; // Toggle status
    try {
      await axios.put(`http://localhost:8080/job-postings/toggle-live/${jobId}`, { live: newStatus }, { withCredentials: true });
      // Refresh job list
      const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
      setJobs(jobResponse.data.data);
      setUpdateStatus('Job live status updated successfully.');
    } catch (err) {
      console.error('Failed to toggle job live status', err);
      setError({ ...error, general: 'Failed to update job live status.' });
    }
  };

  const handleDeleteSelectedJobs = async () => {
    try {
      await axios.delete('http://localhost:8080/job-postings', {
        data: { ids: selectedJobs },
        withCredentials: true,
      });
      // Refresh job list
      const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
      setJobs(jobResponse.data.data);
      setSelectedJobs([]); // Reset selection
    } catch (err) {
      console.error('Failed to delete jobs', err);
      setError({ ...error, general: 'Failed to delete selected jobs.' });
    }
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job posting?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/job-postings/${jobId}`, { withCredentials: true });
      // Refresh job list
      const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
      setJobs(jobResponse.data.data);
      setUpdateStatus('Job posting deleted successfully.');
    } catch (err) {
      console.error('Failed to delete job', err);
      setError({ ...error, general: 'Failed to delete the job.' });
    }
  };

  const handleEditJob = (job) => {
    setEditingJobId(job.id);
    setEditedJob(job);
    setIsEditing(true);
    setJobCategory(job.category || '');
  };

  const validateInput = () => {
    const newError = { title: '', description: '', companyName: '', category: '', general: '' };
    if (!editedJob.title) {
      newError.title = 'Title is required.';
    } else if (editedJob.title.length < 3) {
      newError.title = 'Title must be at least 3 characters long.';
    }

    if (!editedJob.description) {
      newError.description = 'Description is required.';
    } else if (editedJob.description.length < 10) {
      newError.description = 'Description must be at least 10 characters long.';
    }

    if (!editedJob.companyName) {
      newError.companyName = 'Company Name is required.';
    }

    if (!jobCategory) {
      newError.category = 'Category is required.';
    }

    setError(newError);
  };

  const handleSaveJob = async () => {
    validateInput();
    if (error.title || error.description || error.companyName || error.category) {
      return; // Prevent saving if there are validation errors
    }

    try {
      const jobPostingData = { ...editedJob, category: jobCategory };
      await axios.put(`http://localhost:8080/job-postings/${editingJobId}`, jobPostingData, { withCredentials: true });
      // Refresh job list after editing
      const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
      setJobs(jobResponse.data.data);
      setEditingJobId(null);
      setEditedJob({});
      setIsEditing(false);
      setUpdateStatus('Job posting updated successfully.');
    } catch (err) {
      console.error('Failed to save job', err);
      setError({ ...error, general: 'Failed to save job changes.' });
    }
  };

  const handleAddJob = async () => {
    validateAddJobInput();
    if (error.title || error.description || error.companyName || error.category) {
      return; // Prevent saving if there are validation errors
    }

    try {
      await axios.post('http://localhost:8080/job-postings/admin/create', newJob, { withCredentials: true });
      // Refresh job list after adding
      const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
      setJobs(jobResponse.data.data);
      setNewJob({ title: '', description: '', companyName: '', location: '', salary: '', category: '' }); // Reset new job state
      setIsAdding(false);
      setUpdateStatus('Job posting added successfully.');
    } catch (err) {
      console.error('Failed to add job', err);
      setError({ ...error, general: 'Failed to add job posting.' });
    }
  };

  const validateAddJobInput = () => {
    const newError = { title: '', description: '', companyName: '', category: '', general: '' };
    if (!newJob.title) {
      newError.title = 'Title is required.';
    } else if (newJob.title.length < 3) {
      newError.title = 'Title must be at least 3 characters long.';
    }

    if (!newJob.description) {
      newError.description = 'Description is required.';
    } else if (newJob.description.length < 10) {
      newError.description = 'Description must be at least 10 characters long.';
    }

    if (!newJob.companyName) {
      newError.companyName = 'Company Name is required.';
    }

    if (!newJob.category) {
      newError.category = 'Category is required.';
    }

    setError(newError);
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setEditedJob(prevJob => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleNewJobChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevJob => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setJobCategory(e.target.value);
    validateInput();
  };

  const toggleSelectJob = (jobId) => {
    setSelectedJobs(prevSelected => 
      prevSelected.includes(jobId) 
        ? prevSelected.filter(id => id !== jobId) 
        : [...prevSelected, jobId]
    );
  };

  return (
    <div className="job-container">
      <h2>Job Postings</h2>
      {updateStatus && <p className="update-status">{updateStatus}</p>}
      {error.general && <p className="error">{error.general}</p>}
      
      <button onClick={() => setIsAdding(true)}>Add Job</button>
      <button onClick={handleDeleteSelectedJobs} disabled={selectedJobs.length === 0}>Delete Selected Jobs</button>

      {isAdding && (
        <div className="add-job">
          <h3>Add New Job</h3>
          <input type="text" name="title" value={newJob.title} onChange={handleNewJobChange} placeholder="Job Title" />
          <input type="text" name="description" value={newJob.description} onChange={handleNewJobChange} placeholder="Job Description" />
          <input type="text" name="companyName" value={newJob.companyName} onChange={handleNewJobChange} placeholder="Company Name" />
          <input type="text" name="location" value={newJob.location} onChange={handleNewJobChange} placeholder="Location" />
          <input type="number" name="salary" value={newJob.salary} onChange={handleNewJobChange} placeholder="Salary" />
          <select name="category" value={newJob.category} onChange={handleNewJobChange}>
            <option value="">Select Category</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
          <button onClick={handleAddJob}>Add Job</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      )}

      {isEditing && (
        <div className="edit-job">
          <h3>Edit Job</h3>
          <input type="text" name="title" value={editedJob.title} onChange={handleJobChange} placeholder="Job Title" />
          <span className="error">{error.title}</span>
          <input type="text" name="description" value={editedJob.description} onChange={handleJobChange} placeholder="Job Description" />
          <span className="error">{error.description}</span>
          <input type="text" name="companyName" value={editedJob.companyName} onChange={handleJobChange} placeholder="Company Name" />
          <span className="error">{error.companyName}</span>
          <select value={jobCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
          <span className="error">{error.category}</span>
          <button onClick={handleSaveJob}>Save Job</button>
          <button onClick={() => { setIsEditing(false); setEditingJobId(null); }}>Cancel</button>
        </div>
      )}

      <table className="job-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Job Title</th>
            <th>Description</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Category</th>
            <th>Live Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job.id)}
                  onChange={() => toggleSelectJob(job.id)}
                />
              </td>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.companyName}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>{job.category}</td>
              <td>
                <button onClick={() => toggleJobLiveStatus(job.id, job.live)}>
                  {job.live ? 'Deactivate' : 'Activate'}
                </button>
              </td>
              <td>
                <button onClick={() => handleEditJob(job)}>Edit</button>
                <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      // ... (Other parts of the Job component)

// Table for job applications
<h3>Job Applications</h3>
<table>
  <thead>
    <tr>
      <th>Job Title</th>
      <th>Applicant Emails</th>
    </tr>
  </thead>
  <tbody>
    {jobs.map(job => (
      <tr key={job.id}>
        <td>{job.title}</td>
        <td>
          {applications[job.id] && applications[job.id].length > 0 ? (
            applications[job.id].map(app => (
              <div key={app.id}>{app.applicantEmail}</div>
            ))
          ) : (
            'No applications'
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

// ... (Other parts of the Job component)

    </div>
  );
};

export default Job;
