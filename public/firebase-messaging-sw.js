// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

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
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// Register the service worker in your main entry file (e.g., index.js)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
