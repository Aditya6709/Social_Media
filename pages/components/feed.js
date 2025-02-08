"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function PostForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]); // Store posts
  const [feedLoading, setFeedLoading] = useState(true); // Loading state for feed

  // Fetch the username based on Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("User not authenticated");
        return;
      }

      try {
        const res = await fetch(`/api/usernamefetch?uid=${user.uid}`);
        if (!res.ok) throw new Error("Failed to fetch username");
        const data = await res.json();
        setUsername(data.username);
        fetchFeed(data.username); // Fetch posts after getting username
      } catch (err) {
        setError(err.message);
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  // Fetch posts from users the logged-in user follows
  const fetchFeed = async (username) => {
    if (!username) return;
    setFeedLoading(true);

    try {
      const res = await fetch(`/api/fetchfollowlist?username=${username}`);
      if (!res.ok) throw new Error("Failed to fetch feed");
      const data = await res.json();
      setPosts(data.posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setFeedLoading(false);
    }
  };

  // Handle posting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, username }),
      });

      if (!res.ok) throw new Error("Failed to post");

      setText("");
      fetchFeed(username); // Refresh feed after posting
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded max-w-lg mx-auto">
      {/* Post Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="p-2 border rounded"
          required
          style={{ color: "black" }}
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Posting..." : "Post"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      {/* Feed Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Your Feed</h2>
        {feedLoading ? (
          <p>Loading feed...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Follow someone to see their posts.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="p-3 border rounded">
                <p className="text-gray-800">{post.text}</p>
                <p className="text-sm text-gray-500">- {post.username}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
