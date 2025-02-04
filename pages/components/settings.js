import { useState, useEffect } from "react";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState("");
  const [lastUsernameChange, setLastUsernameChange] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch user data on page load (Replace with actual user authentication)
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentUsername: "current_user_here" }) // Replace with actual logged-in user
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setUsername(data.username);
          setEmail(data.email);
          setFavorites(data.favorites.join(", ")); // Convert array to comma-separated string
          setLastUsernameChange(data.lastUsernameChange);
        } else {
          setError(data.error || "Failed to fetch user data.");
        }
      } catch (err) {
        setError("Error fetching user data.");
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUsername: user.username,
          newUsername: username,
          newEmail: email,
          newFavorites: favorites.split(",").map((fav) => fav.trim()), // Convert to array
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Profile updated successfully.");
        setUser(data.user);
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("Error updating profile.");
    }
  };

  const canChangeUsername = () => {
    if (!lastUsernameChange) return true; // If no change before, allow it
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    return new Date() - new Date(lastUsernameChange) >= THIRTY_DAYS;
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Settings</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleUpdate}>
        {/* Username Field */}
        <label>Username (Change every 30 days)</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={!canChangeUsername()}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        {!canChangeUsername() && (
          <p style={{ color: "gray" }}>You can change your username after 30 days.</p>
        )}

        {/* Email Field */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        {/* Favorites Field */}
        <label>Favorites (comma-separated)</label>
        <input
          type="text"
          value={favorites}
          onChange={(e) => setFavorites(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        {/* Submit Button */}
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#FF5B35", color: "#fff", border: "none" }}>
          Update Profile
        </button>
      </form>
    </div>
  );
}
