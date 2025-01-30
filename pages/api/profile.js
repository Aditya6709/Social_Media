import firebaseAdmin from "../../firebase"; // Import Firebase Admin SDK
import User from "../../models/User"; // Import your User model

// Profile API route to get user details by Firebase UID
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Get the Firebase ID token from the request headers (authorization token)
      const token = req.headers.authorization?.split("Bearer ")[1];
      
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Verify the Firebase ID token
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      const uid = decodedToken.uid; // Extract UID from the decoded token

      // Find user in MongoDB by Firebase UID
      const user = await User.findOne({ uid });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user); // Return the user details
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
