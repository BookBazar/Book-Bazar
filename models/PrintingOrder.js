const mongoose = require("mongoose");

const printingOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    printingItems: [
      {
        bookName: { type: String, required: true },
        authorName: { type: String, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        weight: { type: Number, required: true },
        title: { type: String, required: true },
        binding: { type: String, required: true },
        numberOfPages: { type: Number, required: true },
        numberOfBooks: { type: Number, required: true },
        date: { type: String, required: true },
        contact: { type: String, required: true },
        file: { type: String, required: true },
        storeOwner: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
      },
    ],
    price: { type: Number, required: true },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: Number, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isPending: {
      type: Boolean,
      required: true,
      default: true,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCancelled: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("printing", printingOrderSchema);
