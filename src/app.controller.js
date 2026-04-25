import express from "express";
import cors from "cors";
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

dataBaseConnection();

app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/transactions", transactionsRouter);

if (process.env.NODE_ENV != "production") {
  app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
}

export default app;