import React, { useState } from 'react';

const JobForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleJobSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/jobs', {  // Updated endpoint to `/jobs`
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                location,
                salary
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
            setDescription('');
            setLocation('');
            setSalary('');
        })
        .catch(error => {
            setError('Error creating job: ' + error.message);
            console.error('Error creating job:', error);
        });
    };

    return (
        <div>
            <h2>Create Job</h2>
            <form onSubmit={handleJobSubmit}>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Salary:
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Create Job</button>
            </form>
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
        </div>
    );
};

export default JobForm;
