import { bookModel } from "../../database/model/book.model.js";

export const createBook = async (req, res) => {
  if (req.user && req.bearer == "admin") {
    const { title, author, description, rating, publishedYear, availableCopies, urlImage } = req.body;
    const bookFound = await bookModel.find({ title, author });
    if (bookFound.length)
      return res.status(400).json({ message: "book already exists" });
    const book = await bookModel.create({
      title,
      author,
      description,
      rating,
      publishedYear,
      availableCopies,
      urlImage,
      userId: req.user._id,
    });
    if (book) {
      return res.status(201).json({ message: "book created", data: book });
    }
    return res.status(400).json({ message: "book not created" });
  } else {
    return res.status(403).json({ message: "for admin only" });
  }
};

export const editBook = async (req, res) => {
  if (req.user && req.bearer == "admin") {
    const { title, author, description, rating, publishedYear, availableCopies, urlImage } = req.body;
    const { id } = req.params;
    const book = await bookModel.findByIdAndUpdate(id, {
      title,
      author,
      description,
      rating,
      publishedYear,
      availableCopies,
      urlImage,
    });
    if (book) {
      return res.status(200).json({ message: "book updated", data: book });
    }
    return res.status(400).json({ message: "book not updated" });
  } else {
    return res.status(403).json({ message: "for admin only" });
  }
};

export const getBooks = async (req, res) => {

  const books = await bookModel.find();
  if (books.length) {
    return res.status(200).json({ message: "books found", data: books });
  }
  return res.status(404).json({ message: "books not found" });

};

export const getBook = async (req, res) => {
  if (req.user && req.bearer == "admin") {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (book) {
      return res.status(200).json({ message: "book found", data: book });
    }
    return res.status(404).json({ message: "book not found" });
  } else {
    return res.status(403).json({ message: "for admin only" });
  }
};

export const deleteBook = async (req, res) => {
  if (req.user && req.bearer == "admin") {
    const { id } = req.params;
    const book = await bookModel.findByIdAndDelete(id, { new: true });
    if (book) {
      return res.status(200).json({ message: "book deleted", data: book });
    }
    return res.status(404).json({ message: "book not found" });
  } else {
    return res.status(403).json({ message: "for admin only" });
  }
};

export const searchBooks = async (req, res) => {
  const { title, author, page = 1, limit = 10 } = req.query;
  const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);

  const query = {};
  if (title || author) {
    query.$or = [];
    if (title) {
      query.$or.push({ title: { $regex: title, $options: "i" } });
    }
    if (author) {
      query.$or.push({ author: { $regex: author, $options: "i" } });
    }
  }

  const books = await bookModel
    .find(Object.keys(query).length ? query : {})
    .skip(skip)
    .limit(Number.parseInt(limit));

  const total = await bookModel.countDocuments(
    Object.keys(query).length ? query : {}
  );

  if (books.length) {
    return res.status(200).json({
      message: "books found",
      data: books,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total,
        totalPages: Math.ceil(total / Number.parseInt(limit)),
      },
    });
  }
  return res.status(404).json({ message: "books not found" });
};

export const banBook = async (req, res) => {
  if (req.user && req.bearer == "admin") {
    const { id } = req.params;
    const book = await bookModel.findByIdAndUpdate(id, { isActiveAdmin: false }, { new: true });
    if (book) {
      return res.status(200).json({ message: "book banned", data: book });
    }
    return res.status(404).json({ message: "book not found" });
  } else {
    return res.status(403).json({ message: "for admin only" });
  }
};

export const unbanBook = async (req, res) => {
  if (req.user && req.bearer == "admin") {
    const { id } = req.params;
    const book = await bookModel.findByIdAndUpdate(id, { isActiveAdmin: true }, { new: true });
    if (book) {
      return res.status(200).json({ message: "book unbanned", data: book });
    }
    return res.status(404).json({ message: "book not found" });
  } else {
    return res.status(403).json({ message: "for admin only" });
  }
};

