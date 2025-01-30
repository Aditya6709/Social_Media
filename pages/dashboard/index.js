import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebase'; // Import your firebase configuration
import { useRouter } from 'next/router';
import SocialHeader from '../components/social-header';
import '../../styles/dashboard.css';
import Explore from '../explore';

export default function Kutta() {
  const auth = getAuth(app); // Get the auth instance
  const router = useRouter(); // Correct usage of the useRouter hook
  const [currentComponent, setCurrentComponent] = useState(null); // State to manage the current component

  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push('../login/auth'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error); // Handle errors
    }
  };

  const explore = async () => {
    setCurrentComponent(<Explore />); // Set the current component to Explore
  };

  return (
    <div>
      <SocialHeader />
      <button onClick={logout}>Logout</button>
      <button onClick={explore}>Explore</button>
      <div className='main page-width flex'>
        <div className="sidebar basis-1/3">
          <ul>
            <li>
              <button onClick={explore}>
                Explore
              </button>
            </li>
          </ul>
        </div>
        <div className="main-content basis-2/3">
          {currentComponent ? currentComponent : "Welcome"} {/* Render the current component or default text */}
        </div>
      </div>
    </div>
  );
}
