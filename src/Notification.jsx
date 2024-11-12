import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    // Fetch all notifications on component mount
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Function to fetch notifications from backend
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/notifications', { withCredentials: true });;  // Adjust the URL based on your backend
            setNotifications(response.data.data);  // Assuming response has a "data" field with notification data
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    // Function to delete a notification by ID
    const deleteNotification = async (id) => {
        try {
            await axios.delete(`/notifications/${id}`);
            // After deletion, fetch the notifications again to update the list
            fetchNotifications();
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    return (
        <div className="notification-page">
            <h2>Job Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            <div>
                                <strong>{notification.jobTitle}</strong> (ID: {notification.jobId})
                                <p>Salary: {notification.salary}</p>
                            </div>
                            <button onClick={() => deleteNotification(notification.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationPage;
