import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSYPZcHtbIoRDgFximnr8XE_QxmuP3BFw",
  authDomain: "socialweb-1e18f.firebaseapp.com",
  projectId: "socialweb-1e18f",
  storageBucket: "socialweb-1e18f.appspot.com",
  messagingSenderId: "25383523828",
  appId: "1:25383523828:web:fff439be9eeb79bcbf15a1",
  measurementId: "G-BV1NDXPXWV",
};

// Check if Firebase app is already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
const auth = getAuth(app);

// Conditionally initialize Analytics in the browser
if (typeof window !== "undefined") {
  try {
    isSupported()
      .then((supported) => {
        if (supported) {
          getAnalytics(app);
        }
      })
      .catch((error) => {
        console.error("Firebase Analytics initialization error:", error);
      });
  } catch (error) {
    console.error("Error initializing Firebase Analytics:", error);
  }
}

export { auth }; // Export auth for use in other parts of your app
export default app;
