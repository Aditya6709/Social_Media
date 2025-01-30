import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import "../firebase"; // Ensure Firebase is initialized

export default function Logout() {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth);
        router.replace("/"); // Redirect to home after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logoutUser();
  }, [router, auth]);

  return null; // Return nothing (null)
}
