import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Bell, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Info, 
  Trash2,
  Clock,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({ title: "", notificationMessage: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/interaction/all", { withCredentials: true });
      const fetchedNotifications = response.data;
      const jobDetailPromises = fetchedNotifications.map((notif) => {
        if (notif.jobId) {
          return axios
            .get(`http://localhost:8080/job-postings/${notif.jobId}`, { withCredentials: true })
            .then((jobResponse) => ({ ...notif, jobPosting: jobResponse.data.data }))
            .catch(() => ({ ...notif, jobPosting: null }));
        }
        return Promise.resolve({ ...notif, jobPosting: null });
      });

      const notificationsWithJobs = await Promise.all(jobDetailPromises);
      setNotifications(notificationsWithJobs);
    } catch (error) {
      setErrors({ general: "Failed to fetch notifications" });
    } finally {
      setIsLoading(false);
    }
  };

  const generateJobMessage = (jobPosting) => {
    if (!jobPosting) return null;
    const { title, companyName, salary, location } = jobPosting;
    const formattedSalary = salary ? `₹${salary.toLocaleString()}` : "a competitive salary";
    const formattedLocation = location || "an unspecified location";

    return title
      ? `At ${companyName}, the job "${title}" is posted with a salary of ${formattedSalary} in ${formattedLocation}.`
      : `At ${companyName}, a job is posted with a salary of ${formattedSalary} in ${formattedLocation}.`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateNotification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/interaction/create",
        formData,
        { withCredentials: true }
      );
      setStatus("Notification created successfully!");
      setFormData({ title: "", notificationMessage: "" });
      setNotifications([...notifications, response.data]);
    } catch (error) {
      setErrors({ general: "Failed to create notification" });
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/interaction/delete/${id}`, {
        withCredentials: true,
      });
      setStatus("Notification deleted successfully!");
      setNotifications(notifications.filter((notif) => notif.id !== id));
    } catch (error) {
      setErrors({ general: "Failed to delete notification" });
      setStatus("");
    }
  };

  const filteredNotifications = notifications
    .filter(notif => {
      if (searchTerm) {
        return notif.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               notif.notificationMessage?.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .filter(notif => {
      if (filter === "with-jobs") return notif.jobPosting;
      if (filter === "without-jobs") return !notif.jobPosting;
      return true;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-indigo-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Bell className="w-8 h-8 text-indigo-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Notifications Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchNotifications}
                className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Status Messages */}
        {(errors.general || status) && (
          <div className="mb-8">
            {errors.general && (
              <div className="flex items-center bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md" data-aos="fade-down">
                <Info className="w-6 h-6 text-red-500 mr-3" />
                <p className="text-red-700">{errors.general}</p>
              </div>
            )}
            {status && (
              <div className="flex items-center bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md" data-aos="fade-down">
                <Info className="w-6 h-6 text-green-500 mr-3" />
                <p className="text-green-700">{status}</p>
              </div>
            )}
          </div>
        )}

        {/* Create Notification Section */}
        <div className="bg-white rounded-2xl shadow-xl mb-12 overflow-hidden" data-aos="fade-up">
          <div className="p-6 md:p-8 bg-gradient-to-r from-indigo-600 to-purple-600">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Create New Notification</h2>
            <p className="text-indigo-200 mt-2">Share important updates with your team</p>
          </div>
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter notification title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="notificationMessage"
                  value={formData.notificationMessage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  rows="4"
                  placeholder="Enter your notification message"
                />
              </div>
              <button
                onClick={handleCreateNotification}
                className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all font-medium"
              >
                Create Notification
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4" data-aos="fade-up">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Notifications</option>
              <option value="with-jobs">With Job Details</option>
              <option value="without-jobs">Without Job Details</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Notifications</h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">There are no notifications matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  data-aos="fade-up"
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                          {notif.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {notif.notificationMessage}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteNotification(notif.id)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete notification"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {notif.jobPosting && (
                      <div className="mt-6 bg-indigo-50 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Briefcase className="w-5 h-5 text-indigo-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">Job Details</h4>
                        </div>
                        <p className="text-gray-700 mb-4">{generateJobMessage(notif.jobPosting)}</p>
                        <div className="flex flex-wrap gap-4">
                          {notif.jobPosting.location && (
                            <div className="flex items-center text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                              <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                              {notif.jobPosting.location}
                            </div>
                          )}
                          {notif.jobPosting.salary && (
                            <div className="flex items-center text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                              ₹{notif.jobPosting.salary.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Posted {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;