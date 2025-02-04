import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  uid: { type: String, required: true, unique: true }, // Unique Firebase UID
  favorites: { type: [String], default: [] },
  followers: [{ type: String }], // Store `uid` as a plain string, not ObjectId
  following: [{ type: String }],  // Store `uid` as a plain string, not ObjectId
  lastUsernameChange: { type: Date, default: null }, // Stores the last time username was changed
});

// Create the User model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
