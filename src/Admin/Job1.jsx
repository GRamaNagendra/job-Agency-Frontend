import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash, CheckCircle, XCircle, Building, MapPin, DollarSign, Tag, Users, Briefcase } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Job.css';
import AdminJobPosting from './AdminJobposting';

const Job = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [editedJob, setEditedJob] = useState({});
  const [newJob, setNewJob] = useState({ title: '', description: '', companyName: '', location: '', salary: '', category: '' });
  const [jobCategory, setJobCategory] = useState('');
  const [error, setError] = useState({ general: '' });
  const [isSelectMode, setIsSelectMode] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
      setJobs(jobResponse.data.data);

    
      
    } catch (err) {
      setError({ ...error, general: 'Failed to load jobs.' });
      toast.error('Failed to load jobs');
    }
  };

  const toggleJobLiveStatus = async (jobId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await axios.put(`http://localhost:8080/job-postings/toggle-live/${jobId}`, { live: newStatus }, { withCredentials: true });
      setJobs(prevJobs => prevJobs.map(job => job.id === jobId ? { ...job, live: newStatus } : job));
      toast.success(`Job ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      toast.error('Failed to update job status');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!jobId && selectedJobs.length === 0) {
      toast.error('No jobs selected for deletion');
      return;
    }

    const jobsToDelete = jobId ? [jobId] : selectedJobs;
    const confirmMessage = jobId 
      ? 'Are you sure you want to delete this job posting?'
      : `Are you sure you want to delete ${selectedJobs.length} job posting(s)?`;

    if (!window.confirm(confirmMessage)) return;

    try {
      for (const id of jobsToDelete) {
        await axios.delete(`http://localhost:8080/job-postings/${id}`, { withCredentials: true });
      }

      setJobs(prevJobs => prevJobs.filter(job => !jobsToDelete.includes(job.id)));
      setSelectedJobs([]);
      toast.success('Job(s) deleted successfully');
    } catch (err) {
      toast.error('Failed to delete job(s)');
    }
  };

  const handleAddJob = async () => {
    try {
      const response = await axios.post('http://localhost:8080/job-postings/admin/create', newJob, { withCredentials: true });
      setJobs(prevJobs => [...prevJobs, response.data.data]);
      setShowAddJobModal(false);
      setNewJob({ title: '', description: '', companyName: '', location: '', salary: '', category: '' });
      toast.success('Job added successfully');
    } catch (err) {
      toast.error('Failed to add job');
    }
  };

  const handleEditJob = (job) => {
    setEditedJob(job);
    setJobCategory(job.category);
    setShowEditJobModal(true);
  };

  const handleSaveJob = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/job-postings/${editedJob.id}`, { ...editedJob, category: jobCategory }, { withCredentials: true });
      setJobs(prevJobs => prevJobs.map(job => job.id === editedJob.id ? response.data.data : job));
      setShowEditJobModal(false);
      toast.success('Job updated successfully');
    } catch (err) {
      toast.error('Failed to update job');
    }
  };

  const handleJobSelection = (jobId) => {
    setSelectedJobs(prevSelected => {
      const isSelected = prevSelected.includes(jobId);
      return isSelected ? prevSelected.filter(id => id !== jobId) : [...prevSelected, jobId];
    });
  };

 

  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid px-4 py-8 bg-gray-50">
      <motion.div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Job Management Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 mt-2">Manage Your Company's Job Postings and Applications</p>
        </div>



  {/* Search Bar */}
  <div className="flex gap-4 mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Jobs"
            className="px-4 py-2 border rounded-lg w-1/2"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300"
            onClick={() => setShowAddJobModal(true)}
          >
            <PlusCircle className="w-6 h-6 mr-2" />
            Add New Job
          </motion.button>
        </div>



        {/* Action Buttons with Select/Deselect All */}
        <div className="flex flex-wrap gap-4 mb-10">
         
        {isSelectMode && (
  <div className="inline-flex items-center space-x-4 bg-blue-500 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    {/* Checkbox for Select/Deselect All */}
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        checked={selectedJobs.length === jobs.length} // If all jobs are selected, check the box
        onChange={() => {
          if (selectedJobs.length === jobs.length) {
            // Deselect all jobs
            setSelectedJobs([]);
          } else {
            // Select all jobs
            setSelectedJobs(jobs.map(job => job.id));
          }
        }}
        className="w-6 h-6 accent-blue-600 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-lg font-semibold text-white">
        {selectedJobs.length === jobs.length ? (
          <span className="text-white-1600">Deselect All</span>
        ) : (
          <span className="text-white-800">Select All</span>
        )}
      </span>
    </label>
  </div>
)}

      
         

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
            onClick={() => handleDeleteJob()}
            disabled={selectedJobs.length === 0}
          >
            <Trash className="w-6 h-6 mr-2" />
            Delete Selected ({selectedJobs.length})
          </motion.button>
        </div>

        {/* Job Cards Grid with Checkboxes for Selection */}
        
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
  {filteredJobs.map((job) => (
    <motion.div key={job.id} className="relative">
      {isSelectMode && (
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            id={`job-${job.id}`}
            checked={selectedJobs.includes(job.id)}
            onChange={() => handleJobSelection(job.id)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>
      )}
      <div
        className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 ${
          selectedJobs.includes(job.id) ? 'border-blue-500' : ''
        }`}
      >
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <span
              className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold ${
                job.live ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {job.live ? 'Active' : 'Inactive'}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
          <div className="flex items-center mb-4">
            <Building className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-lg font-semibold text-blue-600">{job.companyName}</span>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
          <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="font-medium text-gray-900">Location:</span>
              <span className="text-gray-600">{job.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <DollarSign className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="font-medium text-gray-900">Salary:</span>
              <span className="text-gray-600">${Number(job.salary).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Tag className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="font-medium text-gray-900">Category:</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {job.category}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold shadow-md transition-all duration-300"
              onClick={() => handleEditJob(job)}
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-md transition-all duration-300"
              onClick={() => handleDeleteJob(job.id)} // Delete individual job
            >
              <Trash className="w-5 h-5 mr-2" />
              Delete
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold shadow-md transition-all duration-300 ${
                job.live ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              onClick={() => toggleJobLiveStatus(job.id, job.live)}
            >
              {job.live ? <XCircle className="w-5 h-5 mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
              {job.live ? 'Deactivate' : 'Activate'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>


      {filteredJobs.length === 0 && (
        <div className="text-center text-gray-500 text-xl mt-10">
          No jobs found matching your search criteria
        </div>
      )}


{/* add Job Modal */}
 {/* Modal */}
 {showAddJobModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Job</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddJobModal(false)} // Close the modal when clicked
                ></button>
              </div>
              <div className="modal-body">
                <AdminJobPosting /> {/* Your AdminJobPosting component */}
              </div>
            </div>
          </div>
        </div>
      )}


        {/* Edit Job Modal */}
        {showEditJobModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Job</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditJobModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Job Title"
                    value={editedJob.title}
                    onChange={(e) => setEditedJob({ ...editedJob, title: e.target.value })}
                  />
                  <textarea
                    className="form-control mb-3"
                    placeholder="Job Description"
                    value={editedJob.description}
                    onChange={(e) => setEditedJob({ ...editedJob, description: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Company Name"
                    value={editedJob.companyName}
                    onChange={(e) => setEditedJob({ ...editedJob, companyName: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Location"
                    value={editedJob.location}
                    onChange={(e) => setEditedJob({ ...editedJob, location: e.target.value })}
                  />
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Salary"
                    value={editedJob.salary}
                    onChange={(e) => setEditedJob({ ...editedJob, salary: e.target.value })}
                  />
                  <select
                    className="form-control mb-3"
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditJobModal(false)}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveJob}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </motion.div>
    </div>
  );
};

export default Job;