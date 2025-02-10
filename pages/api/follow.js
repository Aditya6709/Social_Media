import mongoose from "mongoose";
import { connstr } from "@/lib/db";
import User from "@/models/User";

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await mongoose.connect(connstr);
      isConnected = true;
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { currentUsername, targetUsername } = req.body;
    if (!currentUsername || !targetUsername) {
      return res.status(400).json({ error: "Both usernames are required" });
    }

    const currentUser = await User.findOne({ username: currentUsername });
    const targetUser = await User.findOne({ username: targetUsername });

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentUser.following.includes(targetUser.username)) {
      currentUser.following = currentUser.following.filter((u) => u !== targetUser.username);
    } else {
      currentUser.following.push(targetUser.username);
    }

    await currentUser.save();

    return res.status(200).json({ isFollowing: currentUser.following.includes(targetUser.username) });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
