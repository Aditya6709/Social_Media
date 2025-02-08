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

      // Get list of emails the user is following
      const followingEmails = user.following; // This contains emails

      // Fetch usernames corresponding to these emails
      const followingUsers = await User.find(
        { email: { $in: followingEmails } }, // Find users by email
        { username: 1, _id: 0 } // Only fetch the username field
      );

      let followingUsernames = followingUsers.map(user => user.username);

      // Include the logged-in user's own username
      followingUsernames.push(username);

      // Fetch posts from the user + following list
      const posts = await Post.find({ username: { $in: followingUsernames } })
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
