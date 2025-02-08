import Post from "@/models/posts";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    if (req.method === "GET") {
      const { username } = req.query; // Get the username of the logged-in user

      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      // Find the logged-in user
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Get list of UIDs the user is following
      const followingList = user.following;

      if (!followingList || followingList.length === 0) {
        return res.status(200).json({ posts: [] }); // No posts if following nobody
      }

      // Fetch posts from users in the following list
      const posts = await Post.find({ username: { $in: followingList } })
        .sort({ createdAt: -1 }) // Sort by latest post first
        .lean(); // Convert MongoDB objects to plain JS objects

      return res.status(200).json({ posts });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
