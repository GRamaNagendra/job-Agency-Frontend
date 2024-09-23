import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './JobPosting.css';

const JobPosting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobPosting, setJobPosting] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [updateStatus, setUpdateStatus] = useState(null);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const fetchJobPosting = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/job-postings/${id}`, {
            withCredentials: true,
          });
          const data = response.data.data;
          setJobPosting(data);
          setTitle(data.title || '');
          setDescription(data.description || '');
          setCompanyName(data.companyName || '');
          setLocation(data.location || '');
          setSalary(data.salary || '');
        } catch (err) {
          setError('Failed to load job posting.');
          console.error(err);
        }
      };

      fetchJobPosting();
    }
  }, [isEditing, id]);

  const handleSave = async () => {
    if (!title || !description || !companyName) {
      setError('Title, Description, and Company Name are required.');
      return;
    }

    try {
      const jobPostingData = { title, description, companyName, location, salary };

      if (isEditing) {
        await axios.put(`http://localhost:8080/job-postings/${id}`, jobPostingData, {
          withCredentials: true,
        });
        setUpdateStatus('Job posting updated successfully.');
      } else {
        await axios.post('http://localhost:8080/job-postings', jobPostingData, {
          withCredentials: true,
        });
        setUpdateStatus('Job posting created successfully.');
      }
      setError(null);
    } catch (err) {
      setError('Failed to save job posting.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job posting?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/job-postings/${id}`, {
        withCredentials: true,
      });
      setUpdateStatus('Job posting deleted successfully.');
      setError(null);
      navigate('/job-postings');
    } catch (err) {
      setError('Failed to delete job posting.');
      console.error(err);
    }
  };

  const handleApply = async () => {
    const applicantEmail = prompt('Enter your email address to apply:');
    if (!applicantEmail) return;

    try {
      await axios.post(
        `http://localhost:8080/job-postings/${id}/apply`,
        { email: applicantEmail }, // Fix: sending email as object
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      alert('Application submitted successfully.');
    } catch (err) {
      alert('Failed to submit application.');
      console.error(err);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!jobPosting && isEditing) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="job-posting-container">
      <h2>{isEditing ? 'Edit Job Posting' : 'Create Job Posting'}</h2>
      <div className="job-posting-form">
        <label>
          Title:
          <input
            type="text"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Company Name:
          <input
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            placeholder="Enter job location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Salary:
          <input
            type="number"
            placeholder="Enter job salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </label>
        <button onClick={handleSave} className="save-button">
          {isEditing ? 'Update' : 'Create'} Job Posting
        </button>
        {isEditing && (
          <>
            <button onClick={handleDelete} className="delete-button">
              Delete Job Posting
            </button>
            <button onClick={handleApply} className="apply-button">
              Apply for Job
            </button>
          </>
        )}
        {updateStatus && <p className="status-message">{updateStatus}</p>}
      </div>
    </div>
  );
};

export default JobPosting;
