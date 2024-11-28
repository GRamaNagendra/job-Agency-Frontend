import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogout = async () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (!confirmLogout) return;

        setIsLoading(true);
        try {
            // Call the logout API endpoint
            await axios.post('http://localhost:8080/admin/logout', {}, { withCredentials: true });

            // Clear any stored user information
            localStorage.removeItem('user');

            // Redirect to login page
            navigate('/login?logout=true'); // Indicate logout success
        } catch (error) {
            setErrorMessage('Logout failed. Please try again.'); // Set error message
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Are you sure you want to logout?</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button onClick={handleLogout} disabled={isLoading}>
                {isLoading ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
};

export default Logout;
