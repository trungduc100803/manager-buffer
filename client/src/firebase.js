// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAx3RMRx_BvoY-O_md7Vhrc4z_TqD0cWe8',
  authDomain: "manager-buffer.firebaseapp.com",
  projectId: "manager-buffer",
  storageBucket: "manager-buffer.appspot.com",
  messagingSenderId: "8997700531",
  appId: "1:8997700531:web:d79d4132d48193e29b81c6",
  measurementId: "G-BCDQ1ETK7B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);