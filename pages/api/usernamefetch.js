import mongoose from "mongoose";
import { connstr } from "@/lib/db";
import User from "@/models/User"; // Assuming you have a User model

let isConnected = false; // Track MongoDB connection

export default async function usernamefetch(req, res) {
  try {
    if (!isConnected) {
      await mongoose.connect(connstr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
    }

    if (req.method === "GET") {
      const { uid } = req.query; // Use req.query for GET requests

      if (!uid) {
        return res.status(400).json({ error: "uid is required" });
      }

      const user = await User.findOne({ uid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ username: user.username });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
