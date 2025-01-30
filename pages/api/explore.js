import mongoose from "mongoose";
import { connstr } from "@/lib/db"; // Ensure this points to your DB connection string
import User from "@/models/User"; // Adjust path to your User model

let isConnected = false; // Track MongoDB connection status

export default async function handler(req, res) {
  try {
    // Connect to MongoDB if not already connected
    if (!isConnected) {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(connstr, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      isConnected = true;
      console.log("Connected to MongoDB");
    }

    // Handle GET request to fetch usernames
    if (req.method === "GET") {
      try {
        const users = await User.find({}, { _id: 0, username: 1 }); // Fetch only the username field
        console.log("Fetched usernames:", users); // Debug log
        return res.status(200).json(users); // Respond with usernames
      } catch (error) {
        console.error("Error fetching usernames:", error);
        return res.status(500).json({ error: "Failed to fetch usernames" });
      }
    } else {
      // Respond with method not allowed for non-GET requests
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
}
