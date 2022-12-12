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
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
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
  const { username, email, isSeller } = req.user;
  return res.status(200).json({ username, isSeller, email });
};

/**
 * @description Update Profile
 * @route PUT /api/user/update-profile
 * @access Private
 */
module.exports.updateProfile = async (req, res) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  if (name === "") {
    return res.status(400).json({ errors: [{ msg: "Name is required" }] });
  }
  if (email === "") {
    return res.status(400).json({ errors: [{ msg: "Email is required" }] });
  }
  try {
    await userModel.updateOne({ _id }, { username: name, email });
    return res.status(200).json({ msg: "Profile updated succesfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @description Update Passoword
 * @route PUT /api/user/update-password
 * @access Private
 */
module.exports.updatePasswordValidations = [
  body("currentPassword")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Current password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("New Password must be 6 characters long"),
];

module.exports.updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { currentPassword, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const user = await userModel.findOne({ _id });
    if (user) {
      const matched = await bcrypt.compare(currentPassword, user.password);
      if (!matched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Current password is wrong" }] });
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          await userModel.updateOne({ _id }, { password: hash }, { new: true });
          return res.status(200).json({ msg: "Password updated succesfully" });
        } catch (error) {
          return res.status(500).json({ errors });
        }
      }
    } else {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
  }
};

/**
 * @description Get User details
 * @route GET /api/user/user-details/:id
 * @access Public
 */
module.exports.getUserDetails = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const user = await userModel.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ msg: "Something went wrong" });
  }
  return res.status(201).json(user);
};
