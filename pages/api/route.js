import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connstr } from "@/lib/db";  // Ensure this is the correct path for your db connection string

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (isConnected) {
      return res.status(200).json({ mongo: "already connected" });
    }

    // Connect to MongoDB
    await mongoose.connect(connstr);
    isConnected = true;

    return res.status(200).json({ mongo: "connected" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
}
