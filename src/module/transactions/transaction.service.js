import { transactionModel } from "../../database/model/transaction.model.js";
import { userModel } from "../../database/model/user.model.js";
import { bookModel } from "../../database/model/book.model.js";

export const borrowBook = async (req, res) => {
  if (req.user && req.bearer == 'member') {
    const { userId, bookId } = req.params;
    const user = await userModel.findById(userId);
    const book = await bookModel.findById(bookId);
    if (!user || !book) {
      return res.status(404).json({ message: "user or book not found" });
    }
    let transactionFound = await transactionModel.findOne({ userId, bookId, status: "borrowed" });
    if (transactionFound) {
      return res.status(400).json({ message: "book is already borrowed" });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: "user is not active" });
    }
    if (!book.availableCopies) {
      return res.status(400).json({ message: "book is not available" });
    }
    if (!book.isActiveAvailableCopies) {
      return res.status(400).json({ message: "book is not available" });
    }
    if (!book.isActiveAdmin) {
      return res.status(400).json({ message: "book is not available" });
    }
    const transaction = await transactionModel.create({
      userId,
      bookId,
      borrowDate: new Date(),
      status: "borrowed",
    });
    const bookUpdated = await bookModel.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } }, { new: true });
    if (!bookUpdated) {
      return res.status(400).json({ message: "failed to update book" });
    }
    if (!transaction) {
      return res.status(400).json({ message: "failed to create transaction" });
    }
    if (book.availableCopies == 0) {
      const bookDisable = await bookModel.findByIdAndUpdate(bookId, { isActiveAvailableCopies: false }, { new: true });
      if (!bookDisable) {
        return res.status(400).json({ message: "failed to update book" });
      }
    }
    return res.status(201).json({ message: "success", data: transaction });
  } else {
    return res.status(403).json({ message: "login first" });
  }
};

export const returnBook = async (req, res) => {
  if (req.user && req.bearer == 'member') {
    const { id } = req.params;
    const transactionFound = await transactionModel.findById(id);
    if (!transactionFound || transactionFound.userId != req.user._id) {
      return res.status(404).json({ message: "transaction not found" });
    }
    if (transactionFound.status != "borrowed") {
      return res.status(400).json({ message: "transaction is already returned" });
    }
    const transaction = await transactionModel.findByIdAndUpdate(id, { returnDate: new Date(), status: "returned" }, { new: true });
    if (!transaction) {
      return res.status(400).json({ message: "failed to update transaction" });
    }
    const bookUpdated = await bookModel.findByIdAndUpdate(transactionFound.bookId, { $inc: { availableCopies: 1 }, isActiveAvailableCopies: true }, { new: true });
    if (!bookUpdated) {
      return res.status(400).json({ message: "failed to update book" });
    }
    return res.status(200).json({ message: "success", data: transaction });
  } else {
    return res.status(403).json({ message: "login first" });
  }
};

export const getTransactionsUser = async (req, res) => {
  if (req.user && req.bearer == 'member') {
    const transactions = await transactionModel.find({ userId: req.user._id });
    if (transactions.length) {
      return res.status(200).json({ message: "success", data: transactions });
    } else {
      return res.status(404).json({ message: "no transactions found" });
    }
  } else {
    return res.status(403).json({ message: "login first" });
  }
};

export const getTransactionsAdmin = async (req, res) => {
  if (req.user && req.bearer == 'admin') {
    const transactions = await transactionModel.find().populate('userId').populate('bookId');
    if (transactions.length) {
      return res.status(200).json({ message: "success", data: transactions });
    } else {
      return res.status(404).json({ message: "no transactions found" });
    }
  } else {
    return res.status(403).json({ message: "login first" });
  }
};


export const getAllData = async (req, res) => {
  if (req.user && req.bearer == 'admin') {
    const transactions = await transactionModel.find().populate('userId').populate('bookId');
    const books = await bookModel.find();
    const users = await userModel.find();
    let data = { transactions, books, users };

    if (Object.keys(data).length) {
      return res.status(200).json({ message: "success", data });
    } else {
      return res.status(404).json({ message: "no data found" });
    }
  } else {
    return res.status(403).json({ message: "login first" });
  }
};
