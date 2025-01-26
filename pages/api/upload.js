import mongoose from "mongoose";
import { connstr } from "@/lib/db"; // Ensure this is the correct path for your db connection string
import User from "@/models/User"; // Adjust this path according to your project structure

let isConnected = false;




export default async function upload(req, res) {
  try {
    // Connect to the database if not already connected
    if (!isConnected) {
      await mongoose.connect(connstr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
    }

    if (req.method === "POST") {
      // Parse request body (ensure JSON payload is sent)
      const { name, email } = req.body;

      // Validate input
      if (!name || !email ) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
      }

      // Create a new user
      const newUser = new User({ name, email});
      await newUser.save();

      // Respond with success
      return res.status(201).json({ message: "User created successfully.", user: newUser });
    } else {
      // Handle unsupported methods
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed.` });
    }
  } catch (error) {
    console.error("Error in /api/upload:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}