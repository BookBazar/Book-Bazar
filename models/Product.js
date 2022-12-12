const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  edition: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  tags: [String],
});

module.exports = mongoose.model("product", productSchema);
