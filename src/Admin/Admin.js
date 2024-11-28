import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBriefcase,
  faEnvelope,
  faComments,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import Users from "../Admin/User";
import ContactFormSection from "../Admin/ContactFormSection";
import Feedback from "../Admin/Feedback1";
import Job from "../Admin/Job1";
import Applications from "../Admin/Applications"; // Import the new Applications component

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userResponse = await axios.get(
        "http://localhost:8080/admin/users",
        { withCredentials: true }
      );
      setUsers(userResponse.data.users);
    } catch (err) {
      setError("Failed to load users.");
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "jobs":
        return <Job />;
      case "feedback":
        return <Feedback />;
      case "contact":
        return <ContactFormSection />;
      case "applications":
        return <Applications />;
      case "users":
      default:
        return <Users users={users} setUsers={setUsers} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-30 left-0 h-full bg-blue-900 text-white w-64 transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <h2 className="text-2xl font-bold text-sky-400 mb-3 p-6">
          Admin Dashboard
        </h2>
        <nav className="flex flex-col space-y-4 px-6">
          {[
            { label: "Users", icon: faUsers, key: "users" },
            { label: "Jobs", icon: faBriefcase, key: "jobs" },
            { label: "Applications", icon: faBars, key: "applications" },
            { label: "Feedback", icon: faComments, key: "feedback" },
            { label: "Contact", icon: faEnvelope, key: "contact" },
          ].map(({ label, icon, key }) => (
            <button
              key={key}
              className={`flex items-center p-3 rounded-lg text-xl transition-colors ${
                activeTab === key
                  ? "bg-sky-600 text-white"
                  : "text-gray-400 hover:bg-sky-600 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab(key);
                setIsSidebarOpen(false);
              }}
            >
              <FontAwesomeIcon icon={icon} className="mr-3" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white overflow-x-hidden relative md:ml-64">
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg shadow-md">
            <p>{error}</p>
            <button
              className="text-red-600 underline text-sm"
              onClick={() => setError(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h3>
          <div className="mt-6">{renderActiveTab()}</div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-blue-900 text-white flex justify-around py-3 z-50">
        {[
          { label: "Users", icon: faUsers, key: "users" },
          { label: "Jobs", icon: faBriefcase, key: "jobs" },
          { label: "Applications", icon: faBars, key: "applications" },
          { label: "Feedback", icon: faComments, key: "feedback" },
          { label: "Contact", icon: faEnvelope, key: "contact" },
        ].map(({ label, icon, key }) => (
          <button
            key={key}
            className={`flex flex-col items-center text-sm ${
              activeTab === key
                ? "text-sky-400"
                : "text-gray-400 hover:text-sky-400"
            }`}
            onClick={() => setActiveTab(key)}
          >
            <FontAwesomeIcon icon={icon} className="text-xl mb-1" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminDashboard;
