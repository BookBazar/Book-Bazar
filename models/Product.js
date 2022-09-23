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
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
