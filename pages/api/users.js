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
      const { email, uid,username } = req.body;

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
      const newUser = new User({ email, uid ,username});
      await newUser.save();

      return res.status(201).json({ message: "User saved successfully.", user: newUser });
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed.` });
    }
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
