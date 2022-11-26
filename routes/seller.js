const router = require("express").Router();
const verifyUser = require("../middlewares/verifyUser");
const {
  shopValidations,
  createShop,
  productValidations,
  addProduct,
  getStore,
  updateStore,
  updateValidations,
  getProducts,
  getProduct,
  editProductValidations,
  editProduct,
  deleteProduct,
  getStores,
  createReview,
  getUserStore,
  isAlreadyReviewed,
  getAllPrintingPress,
} = require("../controllers/seller");

router.route("/create-store").post(verifyUser, shopValidations, createShop);
router
  .route("/create-product")
  .post(verifyUser, productValidations, addProduct);
router.route("/get-store").get(verifyUser, getStore);
router.route("/get-user-store/:id").get(verifyUser, getUserStore);
router.route("/update-store").put(verifyUser, updateValidations, updateStore);
router
  .route("/edit-product/:id")
  .put(verifyUser, editProductValidations, editProduct);
router.route("/get-products").get(verifyUser, getProducts);
router.route("/get-product/:id").get(verifyUser, getProduct);
router.route("/delete-product/:id").delete(verifyUser, deleteProduct);
router.route("/get-stores").get(getStores);
router.route("/create-review/:id").post(verifyUser, createReview);
router.route("/get-store-review/:id").get(verifyUser, isAlreadyReviewed);
router.route("/get-all-printing-press").get(verifyUser, getAllPrintingPress)

module.exports = router;
