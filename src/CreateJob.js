import React, { useState } from 'react';

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreateJobSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/jobs', {  // Updated endpoint to `/jobs`
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title
      }),
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setMessage('Job created successfully');
      setTitle('');
    })
    .catch(error => {
      setError('Error creating job: ' + error.message);
      console.error('Error creating job:', error);
    });
  };

  return (
    <div className="create-job">
      <h2>Create a New Job</h2>
      <form onSubmit={handleCreateJobSubmit}>
        <div>
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Job</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateJob;
