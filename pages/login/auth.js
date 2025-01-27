import React, { useState } from 'react';
import app from '../../firebase';
import { useRouter } from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Loginpage() {
  const router = useRouter();
  const auth = getAuth(app);
  const Googleprovider = new GoogleAuthProvider();
  const [message, setMessage] = useState(""); // State for success/error messages

  const signupwithgoogle = async () => {
    try {
      const result = await signInWithPopup(auth, Googleprovider);


      console.log("User UID:", result.user.uid);
      console.log("User Email:", result.user.email);

      // Destructure uid and email
      const { uid, email } = result.user;

      // Post user data to API
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, email }),
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(`Success: ${data.message}`);
          router.push("./form"); // Redirect after successful login
        } else {
          const errorData = await response.json();
          setMessage(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setMessage("Error: Unable to save user information.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Error: Login failed. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={signupwithgoogle}>Login with Google</button>
      {message && <p>{message}</p>} {/* Display the message */}
    </div>
  );
}
