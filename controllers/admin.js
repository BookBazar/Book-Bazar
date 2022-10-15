const adminModel = require("../models/Admin");
const sellerModel = require("../models/Seller");
const userModel = require("../models/User");

const generateToken = require("../utils/generateToken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");


/**
 * @description Register
 * @route POST /api/admin/register
 * @access Public
 */
module.exports.registerValidations = [
  body("username").not().isEmpty().trim().withMessage("Name is required"),
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

exports.adminRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const adminExists = await adminModel.findOne({ email });
    if (adminExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Admin already exists" }] });
    } else {
      try {
        const admin = await adminModel.create({
          username,
          email,
          password,
        });

        const token = generateToken(admin._id);
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
 * @route POST /api/admin/login
 * @access Public
 */
module.exports.loginValidations = [
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const admin = await adminModel.findOne({ email }).select("+password");
    if (admin) {
      const matched = await bcrypt.compare(password, admin.password);
      if (matched) {
        const token = generateToken(admin._id);
        return res.status(200).json({ msg: "Login Successfully", token });
      } else {
        return res.status(401).json({ errors: [{ msg: "Invalid Password" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Admin not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Store Requests
 * @route GET /api/admin/store-request
 * @access Prvate
 */
exports.getStoreRequest = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        storeName: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const storeRequests = await sellerModel.find({
    isApproved: { $eq: false },
    ...keyword,
  });
  if (!storeRequests)
    return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ storeRequests });
};

/**
 * @description Specific Store Request
 * @route GET /api/admin/specific-store-request
 * @access Prvate
 */
exports.getSpecificStoreRequest = async (req, res) => {
  const { id } = req.params;
  const storeRequest = await sellerModel.find({ _id: id });
  if (!storeRequest)
    return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ storeRequest });
};

/**
 * @description Approve a store owner
 * @route PUT /api/admin/approve-request
 * @access Prvate
 */
exports.approveStore = async (req, res) => {
  const { id } = req.params;
  await sellerModel.updateOne(
    { user: id },
    { isApproved: true, isBlocked: false }
  );
  await userModel.updateOne({ _id: id }, { isSeller: true });

  return res.status(200).json({ success: true });
};

/**
 * @description Delete a store owner
 * @route DELETE /api/admin/delete-request
 * @access Prvate
 */
exports.deleteStore = async (req, res) => {
  const { id } = req.params;
  await sellerModel.deleteOne({ _id: id });
  return res.status(200).json({ success: true });
};

/**
 * @description Get Store List
 * @route Get /api/admin/store-list
 * @access Prvate
 */
exports.getStoreList = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        storeName: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const value = req.query.value;

  if (value === "all") {
    const storeList = await sellerModel.find({
      isApproved: { $eq: true },
      ...keyword,
    });
    if (!storeList)
      return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ storeList });
  }
  if (value === "block") {
    const storeList = await sellerModel.find({
      isApproved: { $eq: true },
      isBlocked: { $eq: true },
      ...keyword,
    });
    if (!storeList)
      return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ storeList });
  }
  if (value === "unblock") {
    const storeList = await sellerModel.find({
      isApproved: { $eq: true },
      isBlocked: { $eq: false },
      ...keyword,
    });
    if (!storeList)
      return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ storeList });
  }
};

/**
 * @description Specific Store Details
 * @route GET /api/admin/specific-store-list
 * @access Prvate
 */
exports.getSpecificStoreList = async (req, res) => {
  const { id } = req.params;
  const store = await sellerModel.find({ _id: id });
  if (!store) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ store });
};

/**
 * @description Block and Unblock Seller
 * @route PUT /api/admin/block-unblock-seller
 * @access Prvate
 */
exports.blockUnblockSeller = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  await sellerModel.updateOne(
    { user: { $eq: id } },
    { isBlocked: data },
    { new: true }
  );
  await userModel.updateOne({ _id: { $eq: id } }, { isSeller: !data });

  return res.status(200).json({ success: true });
};
