import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GoogleLoginButton from './Login';
import UserProfile from './UserProfile';
import Home from './Home';
import JobPosting from './components/JobPosting';
import JobPostingList from './components/JobPostingList';
import AdminDashboard from './components/Admin';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<GoogleLoginButton />} />

          <Route path="/profile" element={<UserProfile />}  />
          <Route path="/admin" element={<AdminDashboard />}  />
          <Route path="/job-postings" element={<JobPostingList />}  />
          <Route path="/job-postings/create" element={<JobPosting />}  />
          <Route path="/job-postings/edit/:id" element={<JobPosting />}  />
          <Route path="/job-postings/apply/:id" element={<JobPosting />}  />

          {/* Fallback Routes */}
          <Route path="/404" element={<div>Page not found</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
