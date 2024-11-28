import React from 'react';
import './Login.css'

const LoginPage = () => {
  const handleGoogleLogin = () => {
    document.cookie = `redirectUrl=${window.location.href}; path=/;`;
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Secure Login</h1>
        <p className="login-text">We take your security seriously. Your data is protected using advanced encryption and security measures.</p>
        <p className="login-text">By proceeding, you agree to our terms of service and acknowledge that we will securely handle your data.</p>
        <button className="login-btn" onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <p className="terms-text">
          By continuing, you accept all our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
      <div className="circle large"></div>
      <div className="circle medium"></div>
      <div className="circle small"></div>
    </div>
  );
};

export default LoginPage;
