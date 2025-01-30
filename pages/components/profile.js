import { useEffect, useState } from "react";
import firebase from "../../firebase";
import "firebase/auth"; // Import Firebase Auth module

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser; // Get the current user

        if (user) {
          const idToken = await user.getIdToken(); // Get the Firebase ID token

          const res = await fetch("/api/profile", {
            headers: {
              Authorization: `Bearer ${idToken}`, // Send the token in the Authorization header
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUserData(data);
          } else {
            console.error("Error fetching profile data:", res.statusText);
          }
        } else {
          console.log("No user is logged in.");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Favorites:</strong> {userData.favorites.join(", ")}</p>
      <p><strong>Followers:</strong> {userData.followers.length}</p>
      <p><strong>Following:</strong> {userData.following.length}</p>
    </div>
  );
};

export default ProfilePage;
