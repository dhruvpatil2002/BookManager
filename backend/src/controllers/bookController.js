import Book from "../models/bookModel.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, tags, status } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    const book = await Book.create({
      userId: req.user._id,
      title,
      author,
      tags: tags || [],
      status: status || "want-to-read"
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to create book", error: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { status, tag } = req.query;

    const filter = { userId: req.user._id };

    if (status) filter.status = status;
    if (tag) filter.tags = tag;

    const books = await Book.find(filter).sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book", error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;
    book.tags = req.body.tags ?? book.tags;
    book.status = req.body.status ?? book.status;

    const updatedBook = await book.save();

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const total = await Book.countDocuments({ userId: req.user._id });
    const wantToRead = await Book.countDocuments({ userId: req.user._id, status: "want-to-read" });
    const reading = await Book.countDocuments({ userId: req.user._id, status: "reading" });
    const completed = await Book.countDocuments({ userId: req.user._id, status: "completed" });

    res.json({
      total,
      wantToRead,
      reading,
      completed
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
};