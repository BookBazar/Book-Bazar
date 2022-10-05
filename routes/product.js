const router = require("express").Router();

const { getProducts, getProduct } = require("../controllers/product");

router.route("/get-products/:id").get(getProducts);
router.route("/get-product/:id").get(getProduct);

module.exports = router;
