import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);
const Googleprovider = new GoogleAuthProvider();

export const signupwithgoogle = async (setMessage) => {
  try {
    const result = await signInWithPopup(auth, Googleprovider);
    console.log("User UID:", result.user.uid);
    console.log("User Email:", result.user.email);

    // Extract uid and email
    const { uid, email } = result.user;
    const username = email.split("@")[0]; // Generate username from email

    // Post user data to API
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, email, username }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage && setMessage(`Success: ${data.message}`);
    } else {
      const errorData = await response.json();
      setMessage && setMessage(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error("Login failed:", error);
    setMessage && setMessage("Error: Login failed. Please try again.");
  }
};
