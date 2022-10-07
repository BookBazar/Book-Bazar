const router = require("express").Router();

const verifyUser = require("../middlewares/verifyUser");
const {
  addOrderItems,
  getOrders,
  getOrder,
  approveOrder,
  cancelOrder,
  completeOrder,
} = require("../controllers/order");

router.route("/add-order").post(verifyUser, addOrderItems);
router.route("/get-orders/:orderType").get(verifyUser, getOrders);
router.route("/get-order/:id").get(verifyUser, getOrder);
router.route("/approve-order/:id").put(approveOrder);
router.route("/cancel-order/:id").put(cancelOrder);
router.route("/complete-order/:id").put(completeOrder);

module.exports = router;
