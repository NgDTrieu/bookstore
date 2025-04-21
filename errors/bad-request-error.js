const { RuntimeError } = require("./runtime-error");

class BadRequestError extends RuntimeError {
  constructor(message = "Bad request") {
    super(400, message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

module.exports = { BadRequestError };
