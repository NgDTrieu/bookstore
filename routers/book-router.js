const { Router } = require("express");
const { requireAuth } = require("../middlewares/require-auth");
const { bookController } = require("../controllers/book-controller");
const { parseFile } = require("../utils/upload-util");
const bookRouter = Router();
bookRouter.post(
  "/",
  requireAuth,
  parseFile("coverImage"),
  bookController.createBook
);
bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBookById);

module.exports = { bookRouter };
