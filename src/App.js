// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import PrivateRoute from './PrivateRoute';
import GoogleLoginButton from './Login';
import UserProfile from './UserProfile';
import Home from './Home';
import JobPosting from './components/JobPosting';
import JobPostingList from './components/JobPostingList';
import AdminDashboard from './components/Admin';
import Logout from './Logout';
import Layout from './Layout'
const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/home2" element={<Home />} />
          <Route path="/login" element={<GoogleLoginButton />} />
          <Route path="/logout" element={<Logout />} />
          <Route 
            path="/profile" 
            element={<PrivateRoute element={<UserProfile />} allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />} 
          />
          <Route 
            path="/admin" 
            element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['ROLE_ADMIN']} />} 
          />
          <Route 
            path="/job-postings" 
            element={<PrivateRoute element={<JobPostingList />} allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />} 
          />
          <Route 
            path="/job-postings/create" 
            element={<PrivateRoute element={<JobPosting />} allowedRoles={['ROLE_ADMIN']} />} 
          />
          <Route 
            path="/job-postings/edit/:id" 
            element={<PrivateRoute element={<JobPosting />} allowedRoles={['ROLE_ADMIN']} />} 
          />
          <Route 
            path="/job-postings/apply/:id" 
            element={<PrivateRoute element={<JobPosting />} allowedRoles={['ROLE_USER']} />} 
          />

          {/* Fallback Routes */}
          <Route path="/403" element={<div>403 Forbidden</div>} />
          <Route path="/404" element={<div>Page not found</div>} />
         </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;