import React from 'react';
import User from '@/models/User';
import { connstr } from '@/lib/db';
import mongoose from 'mongoose';

let isConnected = false;

export default async function profile(req, res) {
  try {
    if (!isConnected) {
      await mongoose.connect(connstr);
      isConnected = true;
    }

    if (req.method === "POST") {
      const { uid } = req.body; // Get the logged-in user's uid
      
      if (!uid) {
        return res.status(400).json({ error: "UID is required" });
      }

      const currentUser = await User.findOne({ uid });

      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return user data (you can modify what data to return as per your requirements)
      return res.status(200).json(currentUser);
    }

    return res.status(405).json({ error: "Method Not Allowed" }); // Only POST is allowed for this route

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
