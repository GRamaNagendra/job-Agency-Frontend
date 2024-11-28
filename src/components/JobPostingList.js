import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Spinner, Alert, Modal } from 'react-bootstrap';
import { Share2, Copy } from 'lucide-react';
import './JobPostingList.css';

const JobPostingList = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [salaryRange, setSalaryRange] = useState(4000);
    const [applicantEmail, setApplicantEmail] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/job-postings/forusers', { withCredentials: true });
                setJobPostings(response.data.data);
                setLoading(false);
                const uniqueCategories = [...new Set(response.data.data.map(post => post.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError('Failed to load job postings.');
                setLoading(false);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const profileResponse = await axios.get('http://localhost:8080/profile', { withCredentials: true });
                setApplicantEmail(profileResponse.data.email);
            } catch (err) {
                console.error('Failed to load user profile. User may not be logged in.', err);
                setApplicantEmail('');
            }
        };

        fetchJobPostings();
        fetchUserProfile();
    }, []);

    const handleApply = async (jobId) => {
        if (!applicantEmail) {
            alert('You need to log in to apply for the job.');
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/job-postings/${jobId}/apply`,
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

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredPostings = jobPostings.filter(jobPosting => {
        const matchesSearchTerm = jobPosting.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(jobPosting.category);
        const matchesSalary = jobPosting.salary ? jobPosting.salary <= salaryRange : true;

        return matchesSearchTerm && matchesCategory && matchesSalary;
    });

    const indexOfLastPosting = currentPage * itemsPerPage;
    const indexOfFirstPosting = indexOfLastPosting - itemsPerPage;
    const currentPostings = filteredPostings.slice(indexOfFirstPosting, indexOfLastPosting);
    const totalPages = Math.ceil(filteredPostings.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowDetails = (job) => {
        setSelectedJob(job);
        setShowDetailsModal(true);
    };

    const handleCloseDetails = () => {
        setShowDetailsModal(false);
        setSelectedJob(null);
    };

    const handleCopyLink = (jobId) => {
        const jobUrl = `${window.location.origin}/job-postings/${jobId}`;
        navigator.clipboard.writeText(jobUrl).then(() => {
            alert('Job link copied to clipboard.');
        }).catch(err => {
            console.error('Failed to copy the job link:', err);
        });
    };

    const handleShare = (jobId) => {
        const jobUrl = `${window.location.origin}/job-postings/${jobId}`;
        if (navigator.share) {
            navigator.share({
                title: 'Job Posting',
                text: 'Check out this job posting!',
                url: jobUrl,
            }).catch(err => console.error('Error sharing:', err));
        } else {
            alert('Sharing not supported on this browser.');
        }
    };

    return (
        <div className="job-posting-page">
            <header className="header">
                <h1 className="title">Job Listings</h1>
            </header>
            <div className="content1">
                <aside className="filters-section">
                    <input
                        type="text"
                        placeholder="Search job titles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search by job title"
                        className="search-bar"
                    />
                    <div className="salary-filter">
                        <label htmlFor="salaryRange">Salary (Up to): ₹{salaryRange}</label>
                        <input
                            type="range"
                            id="salaryRange"
                            min="0"
                            max="4000"
                            value={salaryRange}
                            onChange={(e) => setSalaryRange(e.target.value)}
                            className="salary-range"
                        />
                    </div>
                    <div className="category-filter">
                        <h4>Categories</h4>
                        {categories.map((category, index) => (
                            <div key={index} className="category-checkbox">
                                <input
                                    type="checkbox"
                                    id={`category-${category}`}
                                    value={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="checkbox"
                                />
                                <label htmlFor={`category-${category}`} className="checkbox-label">{category}</label>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="job-posting-list">
                    {loading && <Spinner animation="border" variant="primary" />}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {filteredPostings.length === 0 && !loading && (
                        <div className="no-postings">No job postings found.</div>
                    )}

                    {filteredPostings.length > 0 && (
                        <div className="job-grid">
                            {currentPostings.map((jobPosting) => (
                                <Card key={jobPosting.id} className="job-posting-card">
                                    


                                    <Card.Body className="job-posting-details">

                                    <div className="action-buttons">
        <button onClick={() => handleShare(jobPosting.id)} className="share-button">
            <Share2 />
        </button>
        <button onClick={() => handleCopyLink(jobPosting.id)} className="copy-link-button">
            <Copy />
        </button>
    </div>
    <br/><hr/>

                                        <h3 className="job-title">{jobPosting.title}</h3>
                                        <p className="company-label"><strong className="label">Company:</strong> <span className="company-value">{jobPosting.companyName}</span></p>
                                        <p className="location-label"><strong className="label">Location:</strong> <span className="location-value">{jobPosting.location}</span></p>
                                        <p className="salary-label"><strong className="label">Salary:</strong> <span className="salary-value">{jobPosting.salary ? `₹${jobPosting.salary}` : 'Not specified'}</span></p>
                                        <p className="category-label"><strong className="label">Category:</strong> <span className="category-value">{jobPosting.category || 'Not specified'}</span></p>
                                        <Button onClick={() => handleShowDetails(jobPosting)} variant="outline-secondary">
                                            View Details
                                        </Button>
                                    </Card.Body>
                                    <Card.Footer className="job-action-links">
                                      
                                        <button onClick={() => handleApply(jobPosting.id)} className="apply-button">
                                            Apply for Job
                                        </button>
                                    </Card.Footer>
                                </Card>
                            ))}
                        </div>
                    )}

                    <div className="pagination-section">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </main>
            </div>

            <Modal show={showDetailsModal} onHide={handleCloseDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedJob?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Company:</strong> {selectedJob?.companyName}</p>
                    <p><strong>Location:</strong> {selectedJob?.location}</p>
                    <p><strong>Salary:</strong> ₹{selectedJob?.salary || 'Not specified'}</p>
                    <p><strong>Description:</strong> {selectedJob?.description || 'No description available.'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>Close</Button>
                    <Button variant="primary" onClick={() => handleApply(selectedJob.id)}>Apply Now</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default JobPostingList;
