import mongoose from "mongoose";

export const connstr = "mongodb+srv://Aditya1234:Aditya1234@cluster0.5ka4u.mongodb.net/user?retryWrites=true&w=majority";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(connstr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};