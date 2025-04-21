const mongoose = require("mongoose");
const { hashPassword } = require("../utils/password-util");
const bankAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
  },
  bankName: {
    type: String,
  },
});
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    province: {
      type: String,
    },
    fullAddress: {
      type: String,
    },
    bankAccount: {
      type: bankAccountSchema,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await hashPassword(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
module.exports = mongoose.model("User", userSchema);
