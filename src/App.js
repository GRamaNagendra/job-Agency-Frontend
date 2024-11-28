// src/App.js
import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import PrivateRoute from './PrivateRoute';
import GoogleLoginButton from './Login';
import UserProfile from './UserProfile';
import Home from './Home/Home';
import JobPosting from './components/JobPosting';
import JobPostingList from './components/JobPostingList';
import AdminDashboard from './Admin/Admin';
import Logout from './Logout';
import Layout from './Layout';
import ContactUs from './contact';
import AboutUs from './about';
import Feedback from './Home/Feedback';
import NotificationPage from './Notification';

import Notification2 from './Notification2';
import AdminJobPosting from './Admin/AdminJobposting';
import NotFound from './NotFound';


const App = () => {
 
  return (
    <Router>
      <UserProvider>
        <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<GoogleLoginButton />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/NOtifications" element={<NotificationPage />} />
          <Route 
            path="/profile" 
            element={<PrivateRoute element={<UserProfile />} allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />} 
          />
          <Route 
            path="/admin" 
            element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['ROLE_ADMIN']} />} 
          />
          {/* <Route 
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
          /> */}

         <Route 
            path="/job-postings" 
           element={<JobPostingList />} 
          />
          <Route 
            path="/job-postings/create" 
             element={<JobPosting />} 
          />
              <Route 
            path="/job-postings/admin/create" 
             element={<AdminJobPosting />} 
          />
          
          <Route 
            path="/job-postings/edit/:id" 
            element={<JobPosting />} 
          />
          <Route 
            path="/job-postings/apply/:id" 
           element={<JobPosting />} 
          />
          {/* Route for viewing a job posting (reuse the JobPosting component) */}
          <Route path="/job-postings/:id" element={<JobPosting />} />




          
          {/* Fallback Routes */}
          <Route path="/403" element={<div>403 Forbidden</div>} />
          <Route path="/404" element={<div>Page not found</div>} />
           {/*<Route path="/n2" element={<Notification2/>} />*/}
           <Route path="/" element={<Home/>} />
<Route path="/*" element={<NotFound/>} />
       
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;