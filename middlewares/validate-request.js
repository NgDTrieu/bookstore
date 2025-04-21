const { validationResult } = require("express-validator");
const {
  RequestValidationError,
} = require("../errors/request-validation-error");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length !== 0) throw new RequestValidationError();
  next();
};

module.exports = { validateRequest };
