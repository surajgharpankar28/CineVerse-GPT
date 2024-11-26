// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBWscEI3PRmpxE15J0RSmRnH7eqouFnIg",
  authDomain: "cineverse-2805.firebaseapp.com",
  projectId: "cineverse-2805",
  storageBucket: "cineverse-2805.firebasestorage.app",
  messagingSenderId: "247468577256",
  appId: "1:247468577256:web:c4f58a04c5995aeb69d45d",
  measurementId: "G-DYGB1VEKH1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // eslint-disable-line no-unused-vars

export const auth = getAuth();
