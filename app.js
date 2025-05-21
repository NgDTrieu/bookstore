require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { rootRouter } = require("./routers");
const { errorHandler } = require("./middlewares/error-handler");
const { currentUser } = require("./middlewares/current-user");
require("dotenv").config({ override: true });
console.log("MONGO_URL", process.env.MONGO_URL);
const app = express();
app.use(cors()); // Cấu hình CORS: Cho phép tất cả các nguồn gửi req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(currentUser);
app.use(rootRouter);
app.use(errorHandler);
const start = async () => {
  try {
    // 4. Kết nối Mongoose với Atlas
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB via Mongoose");

    // 5. Server listen trên port 3000
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();