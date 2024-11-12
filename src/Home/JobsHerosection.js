import React from 'react';
import { Link } from 'react-router-dom';

const JobsHerosection = () => {
 return(
      <section className="call-to-action-section">
        <div className="container">
          <h2>Ready to Start Your Job Search?</h2>
          <p>Join thousands of professionals who have found their dream jobs through JobHub</p>
          <Link to="/jobs">Explore Jobs Now</Link>
        </div>
      </section>

     
   
  );
};

export default JobsHerosection;
