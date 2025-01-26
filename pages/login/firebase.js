// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSYPZcHtbIoRDgFximnr8XE_QxmuP3BFw",
  authDomain: "socialweb-1e18f.firebaseapp.com",
  projectId: "socialweb-1e18f",
  storageBucket: "socialweb-1e18f.firebasestorage.app",
  messagingSenderId: "25383523828",
  appId: "1:25383523828:web:fff439be9eeb79bcbf15a1",
  measurementId: "G-BV1NDXPXWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;