// import React, { useEffect, useState } from 'react';
// import AOS from 'aos';
// import { gsap } from 'gsap';
// import 'aos/dist/aos.css';

// const JobList = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortBy, setSortBy] = useState('title');
//     const [filteredJobs, setFilteredJobs] = useState([]);
//     const [selectedLocation, setSelectedLocation] = useState('');

//     useEffect(() => {
//         // Initialize AOS animations
//         AOS.init({ duration: 1000, once: true });
//         // Fetch jobs data
//         fetch(`${process.env.REACT_APP_API_URL}/jobs`, { credentials: 'include' })
//             .then(response => response.ok ? response.json() : Promise.reject(response))
//             .then(data => {
//                 setJobs(data.jobs || []);
//                 setFilteredJobs(data.jobs || []);
//                 setLoading(false);
//                 // Apply GSAP animations after data loads
//                 gsap.from(".job-item", {
//                     opacity: 0,
//                     y: 20,
//                     duration: 1,
//                     stagger: 0.1,
//                     ease: "power3.out",
//                 });
//             })
//             .catch(error => {
//                 setError('Error fetching jobs: ' + error.message);
//                 setLoading(false);
//             });
//     }, []);

//     // Filter jobs based on search term, location, and sorting
//     useEffect(() => {
//         const results = jobs.filter(job =>
//             job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//             (selectedLocation ? job.location === selectedLocation : true)
//         );
//         setFilteredJobs(results.sort((a, b) => a[sortBy].localeCompare(b[sortBy])));
//     }, [jobs, searchTerm, sortBy, selectedLocation]);

//     if (loading) return <div>Loading jobs...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="job-list-container">
//             <h2 data-aos="fade-up">Job Listings</h2>
//             <div className="filter-section" data-aos="fade-up">
//                 <input
//                     type="text"
//                     placeholder="Search jobs..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="search-input"
//                 />
//                 <select onChange={(e) => setSortBy(e.target.value)} className="sort-select">
//                     <option value="title">Sort by Title</option>
//                     <option value="location">Sort by Location</option>
//                     <option value="salary">Sort by Salary</option>
//                 </select>
//                 <select onChange={(e) => setSelectedLocation(e.target.value)} className="location-filter">
//                     <option value="">All Locations</option>
//                     {[...new Set(jobs.map(job => job.location))].map((loc, index) => (
//                         <option key={index} value={loc}>{loc}</option>
//                     ))}
//                 </select>
//             </div>
//             <ul className="job-grid">
//                 {filteredJobs.map((job) => (
//                     <li key={job.id} className="job-item" data-aos="fade-up">
//                         <h3 className="job-title">{job.title}</h3>
//                         <p className="job-description">{job.description}</p>
//                         <div className="job-meta">
//                             <p className="job-location">
//                                 <strong>Location:</strong> <span className="location-value">{job.location}</span>
//                             </p>
//                             <p className="job-salary">
//                                 <strong>Salary:</strong> <span className="salary-value">{job.salary}</span>
//                             </p>
//                             <p className="job-type">
//                                 <strong>Type:</strong> {job.type}
//                             </p>
//                         </div>
//                         <div className="company-details">
//                             <p><strong>Company:</strong> {job.company.name}</p>
//                             <p><strong>Industry:</strong> {job.company.industry}</p>
//                             <p><strong>Website:</strong> <a href={job.company.website}>{job.company.website}</a></p>
//                         </div>
//                         <div className="job-benefits">
//                             <h4>Benefits:</h4>
//                             <ul>
//                                 {job.benefits.map((benefit, index) => (
//                                     <li key={index}>{benefit}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default JobList;
