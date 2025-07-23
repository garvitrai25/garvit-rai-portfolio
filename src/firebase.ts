// src/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Analytics is optional for the contact form functionality
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore specific functions

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
// const analytics = getAnalytics(app); // Keep this line if you want to use Analytics, otherwise it can be removed

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export the database instance and other necessary functions for use in other components
export { db, collection, addDoc, serverTimestamp };
