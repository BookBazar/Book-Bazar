const router = require("express").Router();

const verifyUser = require("../middlewares/verifyUser");
const {
  addOrderItems,
  getOrders,
  getOrder,
  approveOrder,
  cancelOrder,
  completeOrder,
  getUserOrders,
  getSpecificStoreOrders,
  addPrintingOrderItems,
} = require("../controllers/order");

router.route("/add-order").post(verifyUser, addOrderItems);
router.route("/add-printing-order").post(verifyUser, addPrintingOrderItems);
router.route("/get-orders/:orderType").get(verifyUser, getOrders);
router.route("/get-order/:id").get(verifyUser, getOrder);
router.route("/approve-order/:id").put(approveOrder);
router.route("/cancel-order/:id").put(cancelOrder);
router.route("/complete-order/:id").put(completeOrder);
router.route("/get-user-orders").get(verifyUser, getUserOrders);
router
  .route("/get-specific-store-orders/:id")
  .get(verifyUser, getSpecificStoreOrders);

module.exports = router;
