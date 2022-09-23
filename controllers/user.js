const userModel = require("../models/User");

const generateToken = require("../utils/generateToken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {
  Types: { ObjectId },
} = require("mongoose");

/**
 * @description Register
 * @route POST /api/user/register
 * @access Public
 */
module.exports.registerValidations = [
  body("username").not().isEmpty().trim().withMessage("Name is required"),
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

exports.userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Admin already exists" }] });
    } else {
      try {
        const user = await userModel.create({
          username,
          email,
          password,
        });
        const token = generateToken(user._id);
        return res.status(200).json({ msg: "Account Created", token });
      } catch (error) {
        return res.status(500).json({ errors: error });
      }
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Login
 * @route POST /api/user/login
 * @access Public
 */
module.exports.loginValidations = [
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = generateToken(user._id);
        return res.status(200).json({ msg: "Login Successfully", token });
      } else {
        return res.status(401).json({ errors: [{ msg: "Invalid Password" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get User Info
 * @route GET /api/user/whoami
 * @access Public
 */
module.exports.getUserInfo = async (req, res) => {
  const { username, isSeller } = req.user;
  return res.status(200).json({ username, isSeller });
};
