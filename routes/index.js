const router = require("express").Router();

//paths
const admin = require("./admin");
const user = require("./user");
const uploads = require("./uploads");
const seller = require("./seller");

router.use("/admin", admin);
router.use("/user", user);
router.use("/upload", uploads);
router.use("/seller", seller);

module.exports = router;
