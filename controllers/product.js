const productModel = require("../models/Product");
const {
  Types: { ObjectId },
} = require("mongoose");

/**
 * @description Get Products List
 * @route GET /api/product/get-products
 * @access Public
 */
module.exports.getProducts = async (req, res) => {
  const { id } = req.params;
  const keyword = req.query.keyword
    ? {
        bookName: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  try {
    const products = await productModel.find({
      user: { $eq: ObjectId(id) },
      ...keyword,
    });
    if (!products)
      return res
        .status(401)
        .json({ success: false, msg: "Products not found" });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ errors: error, success: false });
  }
};

/**
 * @description Get Product Details
 * @route GET /api/product/get-product
 * @access Public
 */
module.exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findOne({ _id: { $eq: id } });
    if (!product)
      return res.status(401).json({ success: false, msg: "Product not found" });
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ errors: error, success: false });
  }
};
