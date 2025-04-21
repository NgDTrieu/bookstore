const bcrypt = require("bcryptjs");
const { BadRequestError } = require("../errors/bad-request-error");
const comparePassword = async (suppliedPassword, storedPassword) => {
  const isValidPassword = await bcrypt.compare(
    suppliedPassword,
    storedPassword
  );
  if (!isValidPassword) throw new BadRequestError();
};
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(4);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = { comparePassword, hashPassword };
