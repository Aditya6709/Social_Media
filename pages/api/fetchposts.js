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
      const { username } = req.query;

      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      // Find the logged-in user
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Get list of usernames the user is following (assuming `following` stores usernames, not emails)
      const followingUsernames = user.following ? [...user.following, username] : [username];

      console.log("Following Usernames:", followingUsernames);

      // Fetch posts from the user and their following list
      const posts = await Post.find({ username: { $in: followingUsernames } })
        .sort({ createdAt: -1 })
        .lean();

      console.log("Fetched Posts:", posts);

      return res.status(200).json({ posts });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
