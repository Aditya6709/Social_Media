import mongoose from "mongoose";
import { connstr } from "@/lib/db"; // Adjust the path as needed
import User from "@/models/User"; // Your User schema

let isConnected = false;

export default async function users(req, res) {
  try {
    // Connect to the database if not already connected
    if (!isConnected) {
      await mongoose.connect(connstr);
      isConnected = true;
    }

    if (req.method === "POST") {
      const { email, uid, username } = req.body;

      // Validate input
      if (!email) {
        return res.status(400).json({ error: "Email is required." });
      }
      if (!uid) {
        return res.status(400).json({ error: "UID is required." });
      }

      // Check if user already exists with the same email or UID
      const existingUser = await User.findOne({ $or: [{ email }, { uid }] });
      if (existingUser) {
        return res.status(400).json({ error: "User with this email or UID already exists." });
      }

      // Save the user to the database
      const newUser = new User({ email, uid, username });
      await newUser.save();

      return res.status(201).json({ message: "User saved successfully.", user: newUser });
    } else if (req.method === "PUT") {
      // Handle profile update (change email, username, favorites, etc.)
      const { uid, username, favorites } = req.body;

      // Validate UID
      if (!uid) {
        return res.status(400).json({ error: "UID is required." });
      }

      const user = await User.findOne({ uid });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Update fields as needed
      if (username && username !== user.username) {
        user.username = username; // Update username if provided
      }
      if (favorites) {
        user.favorites = favorites; // Update favorites if provided
      }

      await user.save();
      return res.status(200).json({ message: "User profile updated successfully.", user });
    } else {
      res.setHeader("Allow", ["POST", "PUT"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed.` });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
