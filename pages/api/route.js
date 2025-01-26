import mongoose from "mongoose";
import { connstr } from "@/lib/db"; // Ensure this is the correct path for your db connection string
import User from "@/models/User"; // Adjust this path according to your project structure

let isConnected = false;

export default async function handler(req, res) {
  try {
    // Check if already connected to MongoDB
    if (!isConnected) {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(connstr, { useNewUrlParser: true, useUnifiedTopology: true });
      isConnected = true;
      console.log("Connected to MongoDB");
    }

    // Handle GET request to fetch users
    if (req.method === 'GET') {
      try {
        const users = await User.find({}); // Fetch all users from the 'users' collection
        console.log("Fetched users:", users); // Log fetched users
        return res.status(200).json(users); // Return users in JSON format
      } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: 'Failed to fetch users' });
      }
    } else {
      // Respond with method not allowed if the request method is not GET
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
}
