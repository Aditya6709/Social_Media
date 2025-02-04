"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import authGuard from "../utils/authGaurd";

function Explore() {
  const [usernames, setUsernames] = useState([]);
  const [following, setFollowing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");

  // Fetch current user from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user); // Set the user object directly
        
        // Fetch the username from the usernamefetch API
        try {
          const response = await fetch(`/api/usernamefetch?uid=${user.uid}`);
          if (!response.ok) throw new Error("Failed to fetch username");

          const data = await response.json();
          setCurrentUsername(data.username); // Set current username from API response
        } catch (err) {
          setError("Unable to fetch username.");
        }
      } else {
        setCurrentUser(null);
        setCurrentUsername(""); // Reset if user is not logged in
      }
    });

    return () => unsubscribe();
  }, []); // Only run once on initial mount

  // Fetch usernames and follow status from database
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        if (!currentUser || !currentUsername) return;

        const response = await fetch(`/api/explore?currentUsername=${currentUsername}`);
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsernames(data);

        // Set initial follow state from API response
        const followState = {};
        data.forEach((user) => {
          followState[user.username] = user.isFollowing;
        });
        setFollowing(followState);
      } catch (err) {
        setError("Unable to fetch usernames.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsernames();
  }, [currentUser, currentUsername]); // Fetch again when currentUser or currentUsername changes

  // Handle Follow/Unfollow Action
  const handleFollowToggle = async (targetUsername) => {
    if (!currentUser) return alert("You need to be logged in!");

    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUsername, targetUsername }),
      });

      if (!response.ok) throw new Error("Failed to update follow status");

      const data = await response.json();
      setFollowing((prev) => ({
        ...prev,
        [targetUsername]: data.isFollowing,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {loading && <p>Loading usernames...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {usernames.map((user, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
              <div className="text-black">{user.username}</div>
              {currentUser && currentUsername !== user.username && (
                <button
                  onClick={() => handleFollowToggle(user.username)}
                  className={`mt-2 px-4 py-2 rounded-lg ${
                    following[user.username] ? "bg-red-500" : "bg-blue-500"
                  } text-white`}
                >
                  {following[user.username] ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default authGuard(Explore);


