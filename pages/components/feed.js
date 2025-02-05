"use client";

import { useState } from "react";

export default function PostForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to post");

      setText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="p-2 border rounded"
          required
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
    </div>
  );
}

