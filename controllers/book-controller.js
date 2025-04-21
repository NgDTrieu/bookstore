const Book = require("../models/book-model");
const User = require("../models/user-model");
const { ForbiddenError } = require("../errors/forbidden-error");
const { uploadFile } = require("../utils/upload-util");
const bookController = {
  createBook: async (req, res, next) => {
    const userId = req.currentUser.userId;
    const user = await User.findById(userId);
    if (user.role !== "admin") throw new ForbiddenError();
    const image = req.file.path;
    const { url } = await uploadFile("coverImage", image);
    const book = req.body;
    const newBook = new Book({ ...book, coverImageUrl: url });
    const savedBook = await newBook.save();
    return res.status(200).json(savedBook);
  },
  getAllBooks: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;
      console.log(`Fetching page ${page}, limit ${limit}...`);
      const books = await Book.find().skip(skip).limit(limit);
      const total = await Book.countDocuments();
      console.log(`Found ${books.length} books, total ${total}`);
      return res.status(200).json({ books, total, page, limit });
    } catch (error) {
      console.error("Error in getAllBooks:", error);
      next(error);
    }
  },
  getBookById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Không tìm thấy sách" });
      }
      return res.status(200).json(book);
    } catch (error) {
      console.error("Error in getBookById:", error);
      next(error);
    }
  },
};

module.exports = { bookController };
