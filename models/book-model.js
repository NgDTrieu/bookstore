const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    publisher: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    coverImageUrl: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
