import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { dataBaseConnection } from "./database/connection.js";
import { env } from "../config/env.service.js";
import usersRouter from "./module/users/user.controller.js";
import booksRouter from "./module/books/book.controller.js";
import transactionsRouter from "./module/transactions/transaction.controller.js";

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

app.use(express.json());

// Initialize database connection asynchronously
dataBaseConnection().catch(err => {
  console.error("Failed to initialize database:", err.message);
});

app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/transactions", transactionsRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  res.json({
    status: "ok",
    database: statusMap[dbStatus] || "unknown",
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

// s
if (process.env.NODE_ENV != "production") {
  app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
}

export default app;