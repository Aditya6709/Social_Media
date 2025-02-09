import { connstr } from "@/lib/db";
import User from "../../models/User";
import mongoose from "mongoose";

// Ensure MongoDB reconnects if needed
async function dbConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }
    console.log("Connecting to MongoDB...");
    await mongoose.connect(connstr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}

// Ensure email field is indexed for faster lookups
User.createIndexes({ email: 1 });

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

      // Perform update asynchronously
      const userPromise = User.findOneAndUpdate(
        { email },
        { $set: { favorites } },
        { new: true, upsert: true }
      );

      res.status(200).json({ message: "Favorites update initiated" });

      // Ensure operation completes in background
      await userPromise;
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

      const user = await User.findOne({ email }).lean();

      res.status(200).json({
        hasFavorites: Boolean(user?.favorites?.length),
        favorites: user?.favorites || [],
      });
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ error: "Method not allowed." });
  }
}

