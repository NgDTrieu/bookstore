require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { rootRouter } = require("./routers");
const { errorHandler } = require("./middlewares/error-handler");
const { currentUser } = require("./middlewares/current-user");
require("dotenv").config();
const app = express();
app.use(cors());                                                  // Cấu hình CORS: Cho phép tất cả các nguồn gửi req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(currentUser);
app.use(rootRouter);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDb();
    app.listen(3000, () => {
      console.log("Listen on port: 3000");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const connectDb = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB!"));
};

start();
