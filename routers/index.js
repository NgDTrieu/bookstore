const { Router } = require("express");
const { bookRouter } = require("./book-router");
const { authRouter } = require("./auth-router");
const { cartRouter } = require("./cart-router");
const { userRouter } = require("./user-router");
const { orderRouter } = require("./order-router");
const { reviewRouter } = require("./review-router");

const rootRouter = Router();
rootRouter.use("/api/books", bookRouter);
rootRouter.use("/api", authRouter);
rootRouter.use("/api/carts", cartRouter);
rootRouter.use("/api/users", userRouter);
rootRouter.use("/api/orders", orderRouter);
rootRouter.use("/api/books/:bookId/reviews", reviewRouter);
module.exports = { rootRouter };
