"use client"; // Ensure this is a Client Component

import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUsername(user.email.split("@")[0]); 
      } else {
        setCurrentUsername(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUsername) return;
      setLoading(true);

      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentUsername }),
        });

        const data = await response.json();

        if (response.ok) {
          setProfileData(data);
        } else {
          console.error("Error fetching profile:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUsername]);

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>No profile data available.</p>;

  return (
    <div>
      <h1>{profileData.username}</h1>
      <p>Email: {profileData.email}</p>

      <h3>Favorites</h3>
      {profileData.favorites?.length > 0 ? (
        <ul>
          {profileData.favorites.map((favorite, index) => (
            <li key={index}>{favorite}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}

      <h3>Followers</h3>
      {profileData.followers?.length > 0 ? (
        <ul>
          {profileData.followers.map((follower, index) => (
            <li key={index}>{follower}</li>
          ))}
        </ul>
      ) : (
        <p>No followers yet.</p>
      )}

      <h3>Following</h3>
      {profileData.following?.length > 0 ? (
        <ul>
          {profileData.following.map((following, index) => (
            <li key={index}>{following}</li>
          ))}
        </ul>
      ) : (
        <p>Not following anyone yet.</p>
      )}
    </div>
  );
}
