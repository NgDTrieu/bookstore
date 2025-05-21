const { RuntimeError } = require("./runtime-error");

class UnAuthorizedError extends RuntimeError {
  constructor(message = "Unauthorized") {
    super(401, message);
    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }
}

module.exports = { UnAuthorizedError };
