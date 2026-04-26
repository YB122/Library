import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import { borrowBook, returnBook, getTransactionsUser, getTransactionsAdmin, getAllData } from "./transaction.service.js";

const router = Router();

router.post("/borrow/:userId/:bookId", auth, borrowBook);
router.put("/return/:id", auth, returnBook);
router.get("/user", auth, getTransactionsUser);
router.get("/admin", auth, getTransactionsAdmin);
router.get('/all-data', auth, getAllData)
export default router;
