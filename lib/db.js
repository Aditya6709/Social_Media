import mongoose from "mongoose";

export const connstr =
  "mongodb+srv://Aditya1234:Aditya1234@cluster0.5ka4u.mongodb.net/user?retryWrites=true&w=majority";

// Use a global variable to store the database connection (prevents cold starts)
const globalMongoose = global.mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (globalMongoose.conn) {
    console.log("✅ Using existing MongoDB connection");
    return globalMongoose.conn;
  }

  if (!globalMongoose.promise) {
    console.log("⏳ Connecting to MongoDB...");
    globalMongoose.promise = mongoose.connect(connstr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Prevents long connection delays
    });
  }

  try {
    globalMongoose.conn = await globalMongoose.promise;
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    globalMongoose.conn = null; // Reset connection on failure
    throw new Error("Failed to connect to MongoDB");
  }

  return globalMongoose.conn;
};

// Store the connection globally (only in development mode to prevent multiple instances)
if (process.env.NODE_ENV === "development") {
  global.mongoose = globalMongoose;
}

