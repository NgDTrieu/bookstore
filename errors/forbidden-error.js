const { RuntimeError } = require("./runtime-error");

class ForbiddenError extends RuntimeError {
  constructor(message = "Forbidden") {
    super(400, message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

module.exports = { ForbiddenError };
