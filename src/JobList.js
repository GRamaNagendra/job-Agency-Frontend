import React, { useEffect, useState } from 'react';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/jobs', {
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok: ' + response.statusText);
        })
        .then(data => {
            setJobs(data.jobs || []);
        })
        .catch(error => {
            setError('Error fetching jobs: ' + error.message);
            console.error('There was a problem with the fetch operation:', error);
        });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Job Listings</h2>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Salary:</strong> {job.salary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
