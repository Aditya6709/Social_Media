import User from '@/models/User';
import { connstr } from '@/lib/db';
import mongoose from 'mongoose';

let isConnected = false;

export default async function settings(req, res) {
  try {
    if (!isConnected) {
      await mongoose.connect(connstr);
      isConnected = true;
    }

    if (req.method === "POST") {
      const { currentUsername, newUsername, newEmail, newFavorites } = req.body;

      if (!currentUsername) {
        return res.status(400).json({ error: "Username is required" });
      }

      const currentUser = await User.findOne({ username: currentUsername });

      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Username change logic (only once every 30 days)
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
      const now = new Date();

      if (newUsername && newUsername !== currentUsername) {
        if (currentUser.lastUsernameChange && now - currentUser.lastUsernameChange < THIRTY_DAYS) {
          return res.status(403).json({ error: "Username can only be changed once every 30 days." });
        }

        // Check if new username already exists
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
          return res.status(409).json({ error: "Username is already taken." });
        }

        currentUser.username = newUsername;
        currentUser.lastUsernameChange = now;
      }

      // Email change logic
      if (newEmail) {
        currentUser.email = newEmail;
      }

      // Favorites update logic
      if (newFavorites) {
        currentUser.favorites = newFavorites;
      }

      await currentUser.save();

      return res.status(200).json({ message: "Profile updated successfully.", user: currentUser });
    }

    return res.status(405).json({ error: "Method Not Allowed" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
