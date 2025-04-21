const { RuntimeError } = require("./runtime-error");

class RequestValidationError extends RuntimeError {
  constructor(message = "Invalid request") {
    super(400, message);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}

module.exports = { RequestValidationError };
