import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "../../config/env.service.js";

dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

export const dataBaseConnection = () => {
  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  mongoose
    .connect(env.databaseUrl, options)
    .then(() => console.log("data base connected"))
    .catch((err) => console.log("Database connection error:", err));
};
