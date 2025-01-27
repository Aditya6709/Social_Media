import React, { useState, useEffect } from "react";

export default function Explore() {
  const [usernames, setUsernames] = useState([]); // State to store usernames
  const [loading, setLoading] = useState(true); // State to show loading
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    // Fetch usernames from the API
    const fetchUsernames = async () => {
      try {
        const response = await fetch("/api/explore");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setUsernames(data);
      } catch (err) {
        console.error("Error fetching usernames:", err);
        setError("Unable to fetch usernames. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsernames();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Users</h1>

      {loading && <p>Loading usernames...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {usernames.map((user, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 text-center"
            >
              <div className="text-black ">{user.username}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
