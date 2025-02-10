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

    if (req.method === "POST") {
      const { username, text } = req.body;

      if (!username || !text) {
        return res.status(400).json({ error: "Username and text are required" });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const post = new Post({ username, text });
      await post.save();

      if (!user.posts) {
        user.posts = [];
      }
      user.posts.push(post._id);
      await user.save();

      return res.status(201).json(post);
    }

    if (req.method === "DELETE") {
      const { postId, username } = req.body;

      if (!postId || !username) {
        return res.status(400).json({ error: "Post ID and username are required" });
      }

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.username !== username) {
        return res.status(403).json({ error: "Unauthorized to delete this post" });
      }

      await Post.findByIdAndDelete(postId);
      await User.updateOne({ username }, { $pull: { posts: postId } });

      return res.status(200).json({ message: "Post deleted successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
