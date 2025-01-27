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
  if (req.method === "POST") {
    try {
      const { email, favorites } = req.body;

      // Validate request data
      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "A valid email is required." });
      }

      if (!Array.isArray(favorites)) {
        return res.status(400).json({ error: "Favorites must be an array." });
      }

      // Ensure database connection
      await dbConnect();

      // Find the user by email and update favorites, or create a new user
      const user = await User.findOneAndUpdate(
        { email },
        { $set: { favorites } },
        { new: true, upsert: true } // `upsert` creates a new user if one doesn't exist
      );

      res.status(200).json({
        message: "Favorites saved successfully",
        user,
      });
    } catch (error) {
      console.error("Error saving favorites:", error);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed." });
  }
}
