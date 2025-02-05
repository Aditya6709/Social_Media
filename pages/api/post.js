import Post from "@/models/posts";
import User from "@/models/User"; // Import the User model
import { connectDB } from "@/lib/db";

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    if (req.method === "POST") {
      const { username, text } = req.body;

      if (!username || !text) {
        return res.status(400).json({ error: "Username and text are required" });
      }

      // Find the user by username
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create the post with both username and text
      const post = new Post({
        username, 
        text
      });

      // Save the post
      await post.save();

      // Initialize posts array if it's undefined
      if (!user.posts) {
        user.posts = []; // Ensure posts array is initialized
      }

      // Save the full post inside the user's posts array
      user.posts.push(post);  // Push the full post object, not just its _id
      await user.save();

      return res.status(201).json(post);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
