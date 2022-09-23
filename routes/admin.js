const router = require("express").Router();

const {
  adminLogin,
  adminRegister,
  loginValidations,
  registerValidations,
  getStoreRequest,
  getSpecificStoreRequest,
  approveStore,
  getStoreList,
  getSpecificStoreList,
  deleteStore,
} = require("../controllers/admin");

const verifyAdmin = require("../middlewares/verifyAdmin");

router.route("/register").post(registerValidations, adminRegister);
router.route("/login").post(loginValidations, adminLogin);

router.route("/store-request").get(verifyAdmin, getStoreRequest);
router
  .route("/specific-store-request/:id")
  .get(verifyAdmin, getSpecificStoreRequest);
router.route("/approve-request/:id").put(approveStore);
router.route("/delete-request/:id").delete(deleteStore);

router.route("/store-list").get(verifyAdmin, getStoreList);
router.route("/specific-store-list/:id").get(verifyAdmin, getSpecificStoreList);

module.exports = router;
