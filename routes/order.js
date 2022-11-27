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
  getPrintingOrders,
  approvePrintingOrder,
  cancelPrintingOrder,
  completePrintingOrder,
  getPrintingOrder,
} = require("../controllers/order");

router.route("/add-order").post(verifyUser, addOrderItems);
router.route("/add-printing-order").post(verifyUser, addPrintingOrderItems);
router.route("/get-orders/:orderType").get(verifyUser, getOrders);
router
  .route("/get-printing-orders/:orderType")
  .get(verifyUser, getPrintingOrders);
router.route("/get-order/:id").get(verifyUser, getOrder);
router.route("/get-printing-order/:id").get(verifyUser, getPrintingOrder);
router.route("/approve-order/:id").put(approveOrder);
router.route("/approve-printing-order/:id").put(approvePrintingOrder);
router.route("/cancel-order/:id").put(cancelOrder);
router.route("/cancel-printing-order/:id").put(cancelPrintingOrder);
router.route("/complete-order/:id").put(completeOrder);
router.route("/complete-printing-order/:id").put(completePrintingOrder);
router.route("/get-user-orders").get(verifyUser, getUserOrders);
router
  .route("/get-specific-store-orders/:id")
  .get(verifyUser, getSpecificStoreOrders);

module.exports = router;
