import { Router } from "express";
import { validateInput } from "../../common/utils/validate.js";
import { createBookValidate, editBookValidate, createBulkBooksValidate } from "./book.validate.js";
import { auth } from "../../common/middleware/auth.js";
import { createBook, editBook, getBooks, getBook, deleteBook, searchBooks, banBook, unbanBook, createBulkBooks } from "./book.service.js";

const router = Router();

router.post("/", validateInput(createBookValidate), auth, createBook);
router.put("/:id", validateInput(editBookValidate), auth, editBook);
router.get("/search", searchBooks);
router.get("/", getBooks);
router.get("/:id", auth, getBook);
router.delete("/:id", auth, deleteBook);

router.put("/ban-book/:id", auth, banBook);
router.put("/unban-book/:id", auth, unbanBook);

router.post("/bulk", validateInput(createBulkBooksValidate), auth, createBulkBooks);

export default router;
