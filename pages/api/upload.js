import mongoose from "mongoose";
import { connstr } from "@/lib/db"; // Adjust the path as needed
import User from "@/models/User"; // Your User schema

let isConnected = false;

export default async function upload(req, res) {
  try {
    if (!isConnected) {
      await mongoose.connect(connstr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
    }

    if (req.method === "POST") {
      const { username } = req.body;

      // Validate input
      if (!username) {
        return res.status(400).json({ error: "Username is required." });
      }

      // Save the username to the database
      const newUser = new User({ username });
      await newUser.save();

      return res.status(201).json({ message: "Username saved successfully.", user: newUser });
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed.` });
    }
  } catch (error) {
    console.error("Error saving username:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
