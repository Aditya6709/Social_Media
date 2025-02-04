import mongoose from "mongoose";
import { connstr } from "@/lib/db";
import User from "@/models/User"; // Ensure User model includes a 'following' field

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await mongoose.connect(connstr);
      isConnected = true;
    }

    if (req.method === "GET") {
      const { currentUsername } = req.query; // Get the logged-in user's username
      if (!currentUsername) {
        return res.status(400).json({ error: "Username is required" });
      }

      const currentUser = await User.findOne({ username: currentUsername });

      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const users = await User.find({}, { _id: 0, username: 1 });

      // Check if the current user follows each user
      const usersWithFollowStatus = users.map((user) => ({
        username: user.username,
        isFollowing: currentUser.following.includes(user.username),
      }));

      return res.status(200).json(usersWithFollowStatus);
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
