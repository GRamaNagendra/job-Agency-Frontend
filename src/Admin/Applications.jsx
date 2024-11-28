import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash, CheckCircle, XCircle, Building, MapPin, DollarSign, Tag, Users, Briefcase } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Job.css';


const Application = () => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState({});
    const [error, setError] = useState({ general: '' });


    
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const jobResponse = await axios.get('http://localhost:8080/job-postings', { withCredentials: true });
      setJobs(jobResponse.data.data);

      const applicationsData = {};
      for (const job of jobResponse.data.data) {
        const appResponse = await axios.get(`http://localhost:8080/job-postings/${job.id}/applications`, { withCredentials: true });
        applicationsData[job.id] = appResponse.data.data;
      }
      setApplications(applicationsData);
    } catch (err) {
      setError({ ...error, general: 'Failed to load jobs.' });
      toast.error('Failed to load jobs');
    }
  };

  
  // Render the data or a fallback message
  return (
    <div>


<div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Current Applications</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200">Applications</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map(job => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-lg font-semibold text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{job.companyName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {applications[job.id] && applications[job.id].length > 0 ? (
                          applications[job.id].map(app => (
                            <div key={app.id} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <span className="text-sm font-medium text-gray-700">{app.applicantEmail}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 italic">No Applications Yet</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${job.live ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {job.live ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

    
    </div>
  );
};

export default Application;
