// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPTBiFE5WGdm-0NGyTAbNqZSrFSBkxvdM",
  authDomain: "dev-mathias.firebaseapp.com",
  projectId: "dev-mathias",
  storageBucket: "dev-mathias.firebasestorage.app",
  messagingSenderId: "631680845536",
  appId: "1:631680845536:web:8b290dbbaa263057e87285",
  measurementId: "G-6QP1W2CZ83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
