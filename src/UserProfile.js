import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, User, Shield, Send, LogOut, Edit2, MessageSquare } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [updateStatus, setUpdateStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [feedbackError, setFeedbackError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/profile', {
        withCredentials: true,
      });
      setProfile(response.data);
      setMobileNumber(response.data.mobileNumber || '');
      
      const feedbackResponse = await axios.get(
        'http://localhost:8080/interaction/feedback/user',
        { params: { email: response.data.email } }
      );
      setSubmittedFeedback(feedbackResponse.data.length > 0 ? feedbackResponse.data[0] : null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMobileUpdate = async () => {
    if (!mobileNumber.trim()) {
      alert('Mobile number cannot be empty.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/update', null, {
        params: { mobileNumber: mobileNumber },
        withCredentials: true,
      });
      setUpdateStatus('Mobile number updated successfully');
      setTimeout(() => setUpdateStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setUpdateStatus('Failed to update mobile number');
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      alert('Feedback cannot be empty.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/interaction/feedback/submit', null, {
        params: { message: feedback, email: profile.email },
        withCredentials: true,
      });
      setSubmittedFeedback({ message: feedback });
      setFeedback('');
      setFeedbackError('');
    } catch (err) {
      console.error(err);
      setFeedbackError('Failed to submit feedback.');
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to sign out?');
    if (!confirmLogout) return;

    setIsLoggingOut(true);
    try {
      await axios.post('http://localhost:8080/admin/logout', {}, { withCredentials: true });
      localStorage.removeItem('user');
      navigate('/login?logout=true');
    } catch (error) {
      setFeedbackError('Sign out failed. Please try again.');
      console.error('Sign out failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Personal Dashboard
          </h1>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <LogOut className="w-5 h-5 mr-2" />
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" data-aos="fade-up">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-75 transition-opacity duration-300">
                  <div className="h-full w-full flex items-center justify-center">
                    <Edit2 className="w-8 h-8 text-white transform translate-y-1" />
                  </div>
                </div>
                <img
                  src={profile?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>

              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium uppercase tracking-wider">Full Name</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{profile?.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium uppercase tracking-wider">Email</span>
                    </div>
                    <p className="text-gray-900 font-medium">{profile?.email}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact and Feedback Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Update */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-3 text-blue-600" />
              Update Contact Number
            </h3>
            <div className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter new mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg"
                />
              </div>
              <button
                onClick={handleMobileUpdate}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 text-lg font-medium shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Update Number</span>
              </button>
              {updateStatus && (
                <div className={`px-4 py-3 rounded-lg font-medium text-sm animate-fade-in ${
                  updateStatus.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {updateStatus}
                </div>
              )}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300" data-aos="fade-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
              {submittedFeedback ? 'Update Feedback' : 'Share Your Thoughts'}
            </h3>
            <div className="space-y-5">
              <textarea
                placeholder="Your feedback helps us improve..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg h-32 resize-none"
              />
              <button
                onClick={handleFeedbackSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2 text-lg font-medium shadow-lg hover:shadow-xl"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{submittedFeedback ? 'Update Feedback' : 'Submit Feedback'}</span>
              </button>
              {feedbackError && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg font-medium text-sm">
                  {feedbackError}
                </div>
              )}
              {submittedFeedback && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium mb-2">Previous Feedback</p>
                  <p className="text-gray-900">{submittedFeedback.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;