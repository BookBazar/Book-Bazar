const router = require("express").Router();

//paths
const admin = require("./admin");
const user = require("./user");
const uploads = require("./uploads");
const seller = require("./seller");
const product = require('./product')
const order = require('./order')

router.use("/admin", admin);
router.use("/user", user);
router.use("/upload", uploads);
router.use("/seller", seller);
router.use('/product', product)
router.use('/order', order)

module.exports = router;
