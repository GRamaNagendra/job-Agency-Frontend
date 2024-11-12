
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './JobPosting.css';

const JobPosting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobPosting, setJobPosting] = useState(null);
  const [error, setError] = useState({
    title: '',
    description: '',
    companyName: '',
    category: '', // Add category error state
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState(''); // Add category state
  const [updateStatus, setUpdateStatus] = useState(null);
  const isEditing = !!id;

  useEffect(() => {
    const fetchJobPosting = async () => {
      if (isEditing) {
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
          setCategory(data.category || ''); // Set the category if available
        } catch (err) {
          setError({ ...error, general: 'Failed to load job posting.' });
          console.error(err);
        }
      }
    };

    fetchJobPosting();
  }, [isEditing, id]);

  // Real-time validation for each input
  const validateInput = () => {
    const newError = { title: '', description: '', companyName: '', category: '' }; // Add category validation

    if (!title) {
      newError.title = 'Title is required.';
    } else if (title.length < 3) {
      newError.title = 'Title must be at least 3 characters long.';
    }

    if (!description) {
      newError.description = 'Description is required.';
    } else if (description.length < 10) {
      newError.description = 'Description must be at least 10 characters long.';
    }

    if (!companyName) {
      newError.companyName = 'Company Name is required.';
    }

    if (!category) { // Validate category
      newError.category = 'Category is required.';
    }

    setError(newError);
  };

  const handleSave = async () => {
    validateInput();

    if (error.title || error.description || error.companyName || error.category) {
      return; // Prevent saving if there are validation errors
    }

    try {
      const jobPostingData = { title, description, companyName, location, salary, category }; // Include category

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
      setError({ title: '', description: '', companyName: '', category: '' }); // Clear errors
    } catch (err) {
      setError({ ...error, general: 'Failed to save job posting.' });
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
      setError({ title: '', description: '', companyName: '', category: '' });
      navigate('/job-postings');
    } catch (err) {
      setError({ ...error, general: 'Failed to delete job posting.' });
      console.error(err);
    }
  };

  const handleApply = async () => {
    const applicantEmail = prompt('Enter your email address to apply:');
    if (!applicantEmail) return;

    try {
      await axios.post(
        `http://localhost:8080/job-postings/${id}/apply`,
        { email: applicantEmail },
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

  // Handle input changes and validate
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    validateInput(); // Validate input on change
  };

  const getInputClass = (field) => {
    return error[field] ? 'input-field error' : 'input-field'; // Add error class if there's an error
  };

  if (error.general) {
    return <div className="error-message">{error.general}</div>;
  }

  if (!jobPosting && isEditing) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="job-posting-container">
      <h2 className="job-posting-header">{isEditing ? 'Edit Job Posting' : 'Create Job Posting'}</h2>
      <div className="validation-errors">
        {error.title && <div className="validation-error">{error.title}</div>}
        {error.description && <div className="validation-error">{error.description}</div>}
        {error.companyName && <div className="validation-error">{error.companyName}</div>}
        {error.category && <div className="validation-error">{error.category}</div>} {/* Display category error */}
      </div>
      <div className="job-posting-form">
        <label>
          Title:
          <input
            type="text"
            className={getInputClass('title')}
            placeholder="Enter job title"
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            className={getInputClass('description')}
            placeholder="Enter job description"
            value={description}
            onChange={(e) => handleInputChange(e, setDescription)}
            required
          />
        </label>
        <label>
          Company Name:
          <input
            type="text"
            className={getInputClass('companyName')}
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => handleInputChange(e, setCompanyName)}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            className="input-field"
            placeholder="Enter job location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Salary:
          <input
            type="number"
            className="input-field"
            placeholder="Enter job salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            className={getInputClass('category')}
            placeholder="Enter job category"
            value={category}
            onChange={(e) => handleInputChange(e, setCategory)}
            required
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
