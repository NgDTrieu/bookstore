const { UnAuthorizedError } = require("../errors/unauthorized-error");

const requireAuth = (req, res, next) => {
  if (!req.currentUser) throw new UnAuthorizedError();
  next();
};

module.exports = { requireAuth };
