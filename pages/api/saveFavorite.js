import { connstr } from "@/lib/db";
import User from "../../models/User";
import mongoose from "mongoose";

let isConnected = false; // Track MongoDB connection status

async function dbConnect() {
  if (!isConnected) {
    try {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(connstr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Database connection failed");
    }
  }
}

export default async function handler(req, res) {
  await dbConnect(); // Ensure database connection

  if (req.method === "POST") {
    try {
      const { email, favorites } = req.body;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "A valid email is required." });
      }

      if (!Array.isArray(favorites)) {
        return res.status(400).json({ error: "Favorites must be an array." });
      }

      // Update or create user record with new favorites
      const user = await User.findOneAndUpdate(
        { email },
        { $set: { favorites } },
        { new: true, upsert: true }
      );

      res.status(200).json({ message: "Favorites saved successfully", user });
    } catch (error) {
      console.error("Error saving favorites:", error);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  } else if (req.method === "GET") {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: "Email query parameter is required." });
      }

      const user = await User.findOne({ email });

      if (!user || !user.favorites || user.favorites.length === 0) {
        return res.status(200).json({ hasFavorites: false });
      }

      res.status(200).json({ hasFavorites: true, favorites: user.favorites });
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ error: "Method not allowed." });
  }
}
