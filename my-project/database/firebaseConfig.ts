// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAo3uMvOREZjFb389uE8zsTfvoMPq3iJko",
    authDomain: "my-project-8b262.firebaseapp.com",
    projectId: "my-project-8b262",
    storageBucket: "my-project-8b262.appspot.com",
    messagingSenderId: "411816105520",
    appId: "1:411816105520:web:0cc334a6bf61705f7bfff5",
    measurementId: "G-W0G9YHJ76P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };