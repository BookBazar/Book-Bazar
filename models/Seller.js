const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  storeType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  isCustomer: {
    type: Boolean,
    required: true,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model("seller", sellerSchema);
