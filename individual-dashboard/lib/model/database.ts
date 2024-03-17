import mongoose from "mongoose";

export default async function connectToDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  console.log("MongoDB URI:", MONGODB_URI); // Log the MongoDB URI

  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is already connected.");
      return;
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      dbName: "VeridaqData",
    });

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
