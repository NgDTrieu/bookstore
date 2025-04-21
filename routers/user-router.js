// routers/user-router.js
const { Router } = require("express");
const { getProfile } = require("../controllers/user-controller");
const { requireAuth } = require("../middlewares/require-auth");

const userRouter = Router();

// GET /api/users/me → trả về profile
userRouter.get("/me", requireAuth, getProfile);

module.exports = { userRouter };
