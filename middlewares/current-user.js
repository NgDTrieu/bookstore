const { UnAuthorizedError } = require("../errors/unauthorized-error");
const { validateToken } = require("../utils/token-util");

const currentUser = (req, res, next) => {
  const authorizationHeaders = req.headers.authorization;
  if (!authorizationHeaders) next();
  else {
    try {
      const token = authorizationHeaders.split(" ")[1];
      const payload = validateToken(token);
      req.currentUser = payload;
    } catch (error) {
      throw new UnAuthorizedError("Token invalid");
    }
    next();
  }
};

module.exports = { currentUser };
