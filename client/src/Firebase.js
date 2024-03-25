// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-f54b3.firebaseapp.com",
  projectId: "mern-estate-f54b3",
  storageBucket: "mern-estate-f54b3.appspot.com",
  messagingSenderId: "354540621260",
  appId: "1:354540621260:web:dd9c1292ad3024f8ae6169"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);