// src/firebase.ts

// Import the functions you need from the SDKs you need
// Change these imports to use the 'firebase/compat' or full path if issues persist,
// but the direct 'firebase/app' and 'firebase/firestore' should work with proper Vite config.
// The key is sometimes how the bundler resolves the 'package.json' 'exports' field.

// Let's try explicit imports that are often more robust with bundlers
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite'; // <-- IMPORTANT: Added '/lite' for smaller bundle and sometimes better compatibility
// If you are using getAnalytics, uncomment and ensure it's from '/analytics/lite' or just '/analytics'
// import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration (PASTED FROM YOUR CONSOLE)
const firebaseConfig = {
  apiKey: "AIzaSyDHX-VLzqUb5LpvQhX_dEnnSKp-2tmT2vY",
  authDomain: "portfolio-a89e4.firebaseapp.com",
  projectId: "portfolio-a89e4",
  storageBucket: "portfolio-a89e4.firebasestorage.app",
  messagingSenderId: "605892077569",
  appId: "1:605892077569:web:dbcf03fbae1b0806dbf800",
  measurementId: "G-9KYZX7J8FE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// If you are using getAnalytics, uncomment this:
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export the database instance and other necessary functions for use in other components
export { db, collection, addDoc, serverTimestamp };
