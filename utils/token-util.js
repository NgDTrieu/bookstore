const jwt = require("jsonwebtoken");
const { UnAuthorizedError } = require("../errors/unauthorized-error");

const generateToken = (payload, isAccessToken = true) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: isAccessToken ? "3d" : "30d",
  });
  return token;
};

const validateToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    throw new UnAuthorizedError();
  }
};

module.exports = { generateToken, validateToken };
