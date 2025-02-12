import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { updateEmail } from "firebase/auth";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState("");
  const [lastUsernameChange, setLastUsernameChange] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        setError("User not logged in.");
        return;
      }
      setUser(firebaseUser);
      setEmail(firebaseUser.email);

      try {
        // Send firebaseUID as part of the query parameters
        const response = await fetch(`/api/settings?uid=${firebaseUser.uid}`);
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
          setFavorites(data.favorites.join(", "));
          setLastUsernameChange(data.lastUsernameChange);
        } else {
          setError(data.error || "Error fetching user data.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      if (!user) {
        setError("User not authenticated.");
        return;
      }
  
      // Update Email in Firebase Auth
      if (email !== user.email) {
        try {
          await updateEmail(user, email);
          setSuccess("Email updated successfully.");
        } catch (error) {
          setError("Error updating email. Please re-authenticate.");
          return;
        }
      }
  
      // Update MongoDB Data (Username & Favorites)
      const response = await fetch("/api/users", {  // Changed to "/api/users"
        method: "PUT",  // Changed to PUT request
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          username,
          favorites: favorites.split(",").map(fav => fav.trim()),  // Convert favorites into an array
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setSuccess("Profile updated successfully.");
      } else {
        setError(data.error || "Error updating profile.");
      }
    } catch (err) {
      setError("Failed to update profile.");
    }
  };
  
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
     
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleUpdate}>
        {/* Username */}
        <label>Username (Change every 30 days)</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", background:"none",border: "1px solid #ccc",borderRadius: "5px"}}
        />

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" , background:"none",border: "1px solid #ccc",borderRadius: "5px"}}
        />

        {/* Favorites */}
        <label>Favorites (comma-separated)</label>
        <input
          type="text"
          value={favorites}
          onChange={(e) => setFavorites(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" , background:"none", border: "1px solid #ccc",borderRadius: "5px"}}
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#FF5B35",
            color: "#fff",
            border: "none",
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
