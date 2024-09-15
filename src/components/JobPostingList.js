import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './JobPostingList.css';

const JobPostingList = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/job-postings', {
          withCredentials: true,
        });
        setJobPostings(response.data.data); // Adjusted based on your API response structure
        setLoading(false);
      } catch (err) {
        setError('Failed to load job postings.');
        console.error(err);
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  if (loading) {
    return <div className="loading">Loading job postings...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!jobPostings.length) {
    return <div className="no-postings">No job postings available.</div>;
  }

  return (
    <div className="job-posting-list">
      <h2>Job Postings</h2>
      <Link to="/job-postings/create" className="create-job-link">Create New Job Posting</Link>
      <ul>
        {jobPostings.map((jobPosting) => (
          <li key={jobPosting.id} className="job-posting-item">
            <h3>{jobPosting.title}</h3>
            <p><strong>Company:</strong> {jobPosting.companyName}</p>
            <p><strong>Location:</strong> {jobPosting.location}</p>
            <p><strong>Salary:</strong> {jobPosting.salary ? `$${jobPosting.salary}` : 'Not specified'}</p>
            <Link to={`/job-postings/edit/${jobPosting.id}`} className="edit-link">Edit</Link>
            <Link to={`/job-postings/apply/${jobPosting.id}`} className="apply-link">Apply</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobPostingList;
