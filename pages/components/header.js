import React, { useState, useEffect } from "react";
import { signupwithgoogle } from "../../utils/auth";
import app from '../../firebase';
import { useRouter } from "next/router";
import {   getAuth,onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);
const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("../welcome"); // Redirect if user is logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

   const handleLogin = async () => {
    setLoading(true);
    try {
      await signupwithgoogle();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAbout = () => {
    router.push("/about");
  };

  return (
    <div>
      <div className="header flex w-full justify-between page-width py-6 items-center">
        <div className="logo text-xl"><img src="socialnest.png" alt="" height={200} width={200} /></div>
        <div className="nav flex items-center">
          <ul className="flex gap-5 items-center">
            <li>Home</li>
            <li onClick={handleAbout}>
              <a href="#">About</a>
            </li>
            <li>
              <button
                className="primary-btn"
                onClick={handleLogin}
                disabled={loading}
                aria-label="Login Button"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

