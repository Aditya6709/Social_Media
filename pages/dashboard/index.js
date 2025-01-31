import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebase';
import { useRouter } from 'next/router';
import SocialHeader from '../components/social-header';
import '../../styles/dashboard.css';
import Explore from '../explore';
import Profile from "../components/profile";

export default function Kutta() {
  const auth = getAuth(app);
  const router = useRouter();
  const [currentComponent, setCurrentComponent] = useState(null);

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('../login/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const explore = () => {
    setCurrentComponent(<Explore />);
  };

  const openProfile = () => {  // Renamed function to avoid conflict
    setCurrentComponent(<Profile />);
  };

  return (
    <div>
      <SocialHeader />
      <button onClick={logout}>Logout</button>

      <div className='main page-width flex'>
        <div className="sidebar basis-1/3">
          <ul>
            <li>
              <button onClick={explore}>Explore</button>
            </li>
            <li>
              <button onClick={openProfile}>Profile</button>
            </li>
          </ul>
        </div>
        <div className="main-content basis-2/3">
          {currentComponent || "Welcome"} {/* Render the current component or default text */}
        </div>
      </div>
    </div>
  );
}
