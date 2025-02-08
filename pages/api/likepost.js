import Post from "@/models/posts";
import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "POST") {
      const { postId } = req.body;

      if (!postId) {
        return res.status(400).json({ error: "Post ID is required" });
      }

      // Increment the like count
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      console.log("Likes after update:", post.likes); // Debugging

      return res.status(200).json({ likes: post.likes });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error updating likes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
