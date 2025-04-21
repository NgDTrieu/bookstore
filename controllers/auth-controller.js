const User = require("../models/user-model");
const { comparePassword } = require("../utils/password-util");
const { generateToken } = require("../utils/token-util");

const authController = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    comparePassword(password, user.password);
    const token = {
      accessToken: generateToken({ userId: user.id }),
      refreshToken: generateToken({ userId: user.id }, false),
    };
    return res.status(200).json(token);
  },
  register: async (req, res, next) => {
    const { email, password, fullName } = req.body;
    const newUser = new User({ email, password, fullName });
    const savedUser = await newUser.save();
    const token = {
      accessToken: generateToken({ userId: savedUser.id }),
      refreshToken: generateToken({ userId: savedUser.id }, false),
    };
    return res.status(201).json(token);
  },
  
};

module.exports = { authController };
