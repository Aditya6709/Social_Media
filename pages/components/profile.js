"use client"; // Ensure this is a Client Component

import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [uid, setUid] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uid) return;
      setLoading(true);

      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }),
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
  }, [uid]);

  if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
  if (!profileData) return <p className="text-center text-red-500">No profile data available.</p>;

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
          {profileData.username[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{profileData.username}</h1>
          <p className="text-gray-400">{profileData.email}</p>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Favorites</h3>
        {profileData.favorites?.length > 0 ? (
          <ul className="mt-2 list-disc list-inside text-gray-400">
            {profileData.favorites.map((favorite, index) => (
              <li key={index}>{favorite}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No favorites added yet.</p>
        )}
      </div>

      {/* Followers Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Followers</h3>
        {profileData.followers?.length > 0 ? (
          <ul className="mt-2 space-y-1">
            {profileData.followers.map((follower, index) => (
              <li key={index} className="bg-gray-800 p-2 rounded-md">{follower}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No followers yet.</p>
        )}
      </div>

      {/* Following Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Following</h3>
        {profileData.following?.length > 0 ? (
          <ul className="mt-2 space-y-1">
            {profileData.following.map((following, index) => (
              <li key={index} className="bg-gray-800 p-2 rounded-md">{following}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Not following anyone yet.</p>
        )}
      </div>
    </div>
  );
}
