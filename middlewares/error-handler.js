const { RuntimeError } = require("../errors/runtime-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof RuntimeError)
    return res.status(err.statusCode).send({ message: err.message });
  console.log(err);
  return res.status(502).send({ message: "Internal server error" });
};

module.exports = { errorHandler };
