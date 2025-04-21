class RuntimeError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, RuntimeError.prototype);
  }
}

module.exports = { RuntimeError };
