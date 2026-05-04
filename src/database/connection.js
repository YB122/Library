import mongoose from "mongoose";
import { env } from "../../config/env.service.js";

export const dataBaseConnection = async () => {
  const options = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    bufferMaxEntries: 0,
    bufferCommands: false,
  };

  try {
    await mongoose.connect(env.databaseUrl, options);
    console.log("Database connected");
  } catch (err) {
    console.error('Database connection failed:', err.message);
    throw err;
  }
};
