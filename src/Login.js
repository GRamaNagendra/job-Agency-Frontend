import React, { useState } from 'react';
//import './Login.css'; // Assuming you will put the CSS styles in a separate file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include' // Ensures cookies like session are included in requests
        });

        if (response.ok) {
            console.log('Login successful');
            window.location.href = '/dashboard'; // Redirect to a dashboard or appropriate page
        } else {
            console.log('Login failed');
        }
    };

    const handleGoogleLogin = () => {
        // Store the current full URL in a cookie
       

        // Redirect to Google OAuth2
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            <div className="oauth-login">
                <p>Or login with:</p>
                <button onClick={handleGoogleLogin} className="google-btn">
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;