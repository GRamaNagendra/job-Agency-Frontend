import React from 'react';
import './EnhancedJobPosting.css';

const EnhancedJobPosting = () => {
  return (
    <div className="enhanced-container">
      <div className="left-section">
        <h2>100+</h2>
        <p>Companies Hiring</p>
        <h2>500+</h2>
        <p>Job Openings</p>
        <h2>90%</h2>
        <p>Success Rate</p>
      </div>
      <div className="right-section">
        <h1>Your Dream Job <span className="highlight-text">Awaits</span></h1>
        <p>Discover countless opportunities in your desired field.</p>
        <p>Explore exciting roles from top companies worldwide.</p>
        <p><span className="highlight-text">Apply now</span> and take your career to the next level.</p>
        <p>Find jobs that perfectly match your skills and aspirations.</p>
        <a href="#" className="cta-button">Explore Jobs</a>
      </div>
      <div className="wave-shape"></div>
    </div>
  );
}

export default EnhancedJobPosting;
