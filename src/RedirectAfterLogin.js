
// src/RedirectAfterLogin.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectAfterLogin = () => {
  const navigate = useNavigate();

  // Helper function to retrieve the 'originalUrl' cookie value
  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };

  useEffect(() => {
    // Retrieve the original URL saved in the 'originalUrl' cookie
    const redirectUrl = getCookie('originalUrl');

    if (redirectUrl) {
      // Remove the cookie after retrieving the value
      document.cookie = 'originalUrl=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      
      // Redirect to the saved original URL
      console.log('Redirecting to:', redirectUrl);
      navigate(redirectUrl);
    } else {
      // If no URL is saved, navigate to the default home page
      navigate('/home');
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectAfterLogin;
