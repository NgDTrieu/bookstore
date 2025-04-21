// controllers/user-controller.js
const User = require("../models/user-model");

async function getProfile(req, res, next) {
  try {
    // req.currentUser do currentUser middleware gán
    const userId = req.currentUser.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User không tìm thấy" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile };
