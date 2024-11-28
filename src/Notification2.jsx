// Notification.js
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBlmw7qqjMAKYRuFIpxVdbgVPZKZm9GREA",
  authDomain: "fornotifications-f1758.firebaseapp.com",
  projectId: "fornotifications-f1758",
  storageBucket: "fornotifications-f1758.appspot.com",
  messagingSenderId: "423256105661",
  appId: "1:423256105661:web:3ee2a499c2ddd78d86cdd4",
  measurementId: "G-QRTNH01M3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const VAPID_KEY = "BBg5rvEQ7RXhfMLRTkuE4sR7KXaKcouMGVrgfXXe_F5akExjqM8B8plLFVC4cW3xN10fbpNiO64fUuGHnXLH1rg";

const Notification2 = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Request notification permission and get token
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          await fetchToken();
        } else {
          console.error('Notification permission denied.');
        }
      } catch (error) {
        console.error('An error occurred while requesting notification permission:', error);
      }
    };

    // Get FCM token
    const fetchToken = async () => {
      try {
        const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          setToken(currentToken);
          // Optionally, send the token to your server here
        } else {
          console.warn('Failed to get FCM token.');
        }
      } catch (error) {
        console.error('An error occurred while retrieving the FCM token:', error);
      }
    };

    // Handle incoming messages when app is in foreground
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload);
      // Customize how you handle the message here
      alert(`New Notification: ${payload.notification.title}`);
    });

    // Request permission on component mount
    requestNotificationPermission();
  }, []);

  return (
    <div>
      <h2>Notification Setup</h2>
      <p>Token: {token || 'No token generated'}</p>
      <p>Check the console for notifications and errors.</p>
    </div>
  );
};

export default Notification2;
