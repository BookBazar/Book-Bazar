const router = require("express").Router();

const verifyUser = require("../middlewares/verifyUser");
const { addOrderItems } = require("../controllers/order");

router.route("/add-order").post(verifyUser, addOrderItems);

module.exports = router;
