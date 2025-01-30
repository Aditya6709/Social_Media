import mongoose from "mongoose";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { currentUsername, targetUsername } = req.body;

  try {
    if (mongoose.connection.readyState === 0) {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(process.env.MONGO_URI);
    }

    const currentUser = await User.findOne({ username: currentUsername });
    const targetUser = await User.findOne({ username: targetUsername });

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isAlreadyFollowing = currentUser.following.includes(targetUser.uid);

    if (isAlreadyFollowing) {
      await User.updateOne(
        { username: currentUsername },
        { $pull: { following: targetUser.uid } }
      );
      await User.updateOne(
        { username: targetUsername },
        { $pull: { followers: currentUser.uid } }
      );
    } else {
      await User.updateOne(
        { username: currentUsername },
        { $push: { following: targetUser.uid } }
      );
      await User.updateOne(
        { username: targetUsername },
        { $push: { followers: currentUser.uid } }
      );
    }

    const updatedUser = await User.findOne({ username: currentUsername });
    return res.status(200).json({ isFollowing: !isAlreadyFollowing, following: updatedUser.following });
  } catch (error) {
    console.error("Error in follow/unfollow:", error);
    return res.status(500).json({ error: "Failed to follow/unfollow" });
  }
}
