const sellerModel = require("../models/Seller");
const productSchema = require("../models/Product");

const { body, validationResult } = require("express-validator");

/**
 * @description Create shop
 * @route POST /api/seller/create-store
 * @access Private
 */
module.exports.shopValidations = [
  body("storeName")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Store Name is required"),
  body("ownerName")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Owner Name is required"),
  body("contact")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Contact Number is required"),
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("storeType")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Store Type is required"),
  body("address").not().isEmpty().trim().withMessage("Address is required"),
  body("image").not().isEmpty().trim().withMessage("Image is required"),
];

exports.createShop = async (req, res) => {
  const {
    storeName,
    ownerName,
    contact,
    email,
    storeType,
    address,
    location,
    image,
    isCustomer,
  } = req.body;
  const { _id } = req.user;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const newStore = await sellerModel.create({
        user: _id,
        storeName,
        ownerName,
        contact,
        email,
        storeType,
        address,
        location,
        image,
        isCustomer,
      });
      return res
        .status(200)
        .json({ msg: "Store request sent successfully", newStore });
    } catch (error) {
      return res.status(500).json({ errors: error, msg: error.message });
    }
  }
};

/**
 * @description Create Product
 * @route POST /api/seller/create-product
 * @access Private
 */
module.exports.productValidations = [
  body("bookName").not().isEmpty().trim().withMessage("Book Name is required"),
  body("authorName")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Author Name is required"),
  body("price").not().isEmpty().trim().withMessage("Price is required"),
  body("image").not().isEmpty().trim().withMessage("Image is required"),
  body("category").not().isEmpty().trim().withMessage("Category is required"),
];
exports.addProduct = async (req, res) => {
  const { bookName, authorName, price, image, category } = req.body;
  const { _id } = req.user;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const newProduct = await productSchema.create({
        user: _id,
        bookName,
        authorName,
        price,
        image,
        category,
      });
      return res
        .status(200)
        .json({ msg: "Product added successfully", newProduct });
    } catch (error) {
      return res.status(500).json({ errors: error, msg: error.message });
    }
  }
};

/**
 * @description Get Store
 * @route GET /api/seller/get-store
 * @access Private
 */
exports.getStore = async (req, res) => {
  const { _id } = req.user;
  const store = await sellerModel.findOne({ user: { $eq: _id } });
  if (!store) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ store });
};

/**
 * @description Update Store
 * @route PUT /api/seller/update-store
 * @access Private
 */
module.exports.updateValidations = [
  body("storeName")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Store Name is required"),
  body("contact")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Contact Number is required"),
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("address").not().isEmpty().trim().withMessage("Address is required"),
];
exports.updateStore = async (req, res) => {
  const { storeName, email, contact, address } = req.body;
  const { _id } = req.user;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      await sellerModel.updateOne(
        { user: _id },
        {
          storeName,
          email,
          contact,
          address,
        }
      );
      return res.status(200).json({ msg: "Store Updated successfully" });
    } catch (error) {
      return res.status(500).json({ errors: error, msg: error.message });
    }
  }
};

/**
 * @description Get Products
 * @route GET /api/seller/get-products
 * @access Private
 */
exports.getProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        bookName: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const { _id } = req.user;

  const products = await productSchema.find({ user: { $eq: _id }, ...keyword });
  if (!products) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ products });
};

/**
 * @description Get Product
 * @route GET /api/seller/get-product
 * @access Private
 */
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productSchema.findOne({ _id: { $eq: id } });
  if (!product) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ product });
};

/**
 * @description Edit Product
 * @route PUT /api/seller/edit-product
 * @access Private
 */
module.exports.editProductValidations = [
  body("bookName").not().isEmpty().trim().withMessage("Book Name is required"),
  body("authorName")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Author Name is required"),
  body("price").not().isEmpty().trim().withMessage("Price is required"),
  body("image").not().isEmpty().trim().withMessage("Image is required"),
  body("category").not().isEmpty().trim().withMessage("Category is required"),
];
exports.editProduct = async (req, res) => {
  const { bookName, authorName, price, image, category } = req.body;
  const { id } = req.params;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      await productSchema.updateOne(
        { _id: { $eq: id } },
        {
          bookName,
          authorName,
          price,
          image,
          category,
        },
        { new: true }
      );
      return res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
      return res.status(500).json({ errors: error, msg: error.message });
    }
  }
};

/**
 * @description Delete a Product
 * @route DELETE /api/admin/delete-product
 * @access Prvate
 */
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productSchema.deleteOne({ _id: id });
  return res.status(200).json({ success: true });
};