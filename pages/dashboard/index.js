import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebase'; // Import your firebase configuration
import { useRouter } from 'next/router';
import SocialHeader from '../components/social-header';

export default function Kutta() {
  const auth = getAuth(app); // Get the auth instance
  const router = useRouter(); // Correct usage of the useRouter hook

  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push('../login/auth'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error); // Handle errors
    }
  };

  return (
    <div>
      <SocialHeader/>
      <div className='main'>
        <button onClick={logout}>Logout</button> {/* Logout button */}
      </div>
    </div>
  );
}
