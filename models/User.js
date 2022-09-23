const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "email field cannot be left empty"],
    },
    email: {
      type: String,
      required: [true, "email field cannot be left empty"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [6, "Password must be atleast 6 characters"],
      maxlength: [1024, "Password cannot excede 1024 characters"],
      select: false,
    },
    isSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("user", userSchema);
