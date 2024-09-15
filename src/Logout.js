import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('http://localhost:8080/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                navigate('/login');  // Redirect to login page on success
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
