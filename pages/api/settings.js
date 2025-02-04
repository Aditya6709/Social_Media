// API handler in `pages/api/settings.js` or similar file
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectDB(); // Ensure DB is connected

  if (req.method === "GET") {
    try {
      const { uid } = req.query;
      if (!uid) return res.status(400).json({ error: "uid is required" });

      const user = await User.findOne({ uid }); // Find user by UID
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user); // Return user data
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching user data" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
