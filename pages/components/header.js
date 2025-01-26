import React, { useState } from 'react'; // Import useState
import '../../styles/header.css';
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Use useState in a functional component

  const handleLogin = () => {
    setLoading(true);
    router.push("/login/auth");
  };

  return (
    <div>
      <div className="header flex w-full justify-between page-width py-6 items-center">
        <div className="logo text-xl">Logo</div>
        <div className="nav flex items-center">
          <ul className='flex gap-5 items-center'>
            <li><a href="/login/auth">Home</a></li>
            <li><a href="#">About</a></li>
            <li> <button
            className="primary-btn"
            onClick={handleLogin}
            disabled={loading}
            aria-label="Login Button"
          >
            Login
          </button></li>
          </ul>

        </div>

      </div>
    </div>
  );
};

export default Header; // Export as default
