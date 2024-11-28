import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Reply, 
  RefreshCw, 
  AlertCircle, 
  Search, 
  Filter, 
  ChevronDown,
  Mail,
  Phone
} from 'lucide-react';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleDeleteSelectedFeedback = async () => {
    try {
      // Send a DELETE request with the selected feedback IDs
      await fetch('http://localhost:8080/interaction/feedback/delete-selected', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedFeedback), // Send the selected feedback IDs as JSON
        credentials: 'include',
      });
  
      // Re-fetch feedback after successful deletion
      await fetchFeedback();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error('Failed to delete selected feedback', err);
      setError('Failed to delete selected feedback.');
    }
  };
  

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const feedbackResponse = await fetch('http://localhost:8080/interaction/feedback/all', {
        credentials: 'include'
      });
      const data = await feedbackResponse.json();
      setFeedback(data);
      setError(null);
    } catch (err) {
      setError('Failed to load feedback.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      // DELETE request for a specific feedback ID
      await fetch(`http://localhost:8080/interaction/feedback/delete/${feedbackId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      // Re-fetch feedback after successful deletion
      await fetchFeedback();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error('Failed to delete feedback', err);
      setError('Failed to delete feedback.');
    }
  };

  const toggleSelectFeedback = (feedbackId) => {
    setSelectedFeedback(prevSelected =>
      prevSelected.includes(feedbackId)
        ? prevSelected.filter(id => id !== feedbackId)
        : [...prevSelected, feedbackId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFeedback.length === feedback.length) {
      setSelectedFeedback([]);
    } else {
      setSelectedFeedback(feedback.map(item => item.id));
    }
  };

  const filteredFeedback = feedback
    .filter(item => {
      const matchesSearch = 
        item.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filterRole === 'all' || item.user.role === filterRole;
      
      return matchesSearch && matchesRole;
    });
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date'; // You can customize the fallback string
      }
    
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    };
    
  return (
    <div className="px-6 py-8 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Management</h1>
        <p className="text-gray-600">Manage and respond to user feedback across the platform</p>
      </div>

      {/* Controls Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDeleteSelectedFeedback}
              disabled={selectedFeedback.length === 0}
              className="inline-flex items-center px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected ({selectedFeedback.length})
            </button>
            <button
              onClick={fetchFeedback}
              className="inline-flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 transition-shadow duration-200"
              />
            </div>
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-40 transition-shadow duration-200"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={selectedFeedback.length === feedback.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  />
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User Details</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Info</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Activity</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Feedback</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFeedback.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedFeedback.includes(item.id)}
                      onChange={() => toggleSelectFeedback(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 flex-shrink-0">
                        {item.user.profilePicture ? (
                          <img
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                            src={item.user.profilePicture}
                            alt=""
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        {item.user.username}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.user.role}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div>
                      <Mail className="w-5 h-5 inline-block mr-2 text-gray-400" />
                      {item.user.email}
                    </div>
                    <div>
                      <Phone className="w-5 h-5 inline-block mr-2 text-gray-400" />
                      {item.user.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{formatDate(item.createdAt)}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.message}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDeleteFeedback(item.id)}
                      className="inline-flex items-center text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success/Error Alert */}
      {showAlert && (
        <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
          Feedback deleted successfully!
        </div>
      )}
      {error && (
        <div className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default Feedback;
