import React from 'react';
import app from '../../firebase';
import { useRouter } from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Loginpage() {
  const router = useRouter(); // Use router within the component
  const auth = getAuth(app);
  const Googleprovider = new GoogleAuthProvider();

  const signupwithgoogle = async () => {
    try {
      const result = await signInWithPopup(auth, Googleprovider);
      console.log("User:", result.user); // Log the user details
      console.log("User UID:", result.user.uid); // Log the UID of the current user
      router.push("../dashboard"); // Use an absolute path for the redirect
    } catch (error) {
      console.error("Login failed:", error); // Handle errors
    }
  };

  return (
    <div>
      <button onClick={signupwithgoogle}>Login with Google</button>
    </div>
  );
}
