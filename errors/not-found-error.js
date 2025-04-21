const { RuntimeError } = require("./runtime-error");

class NotFoundError extends RuntimeError {
  constructor(message = "Not found") {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

module.exports = { NotFoundError };
