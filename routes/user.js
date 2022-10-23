const router = require("express").Router();

const verifyUser = require("../middlewares/verifyUser");

const {
  userLogin,
  loginValidations,
  userRegister,
  registerValidations,
  getUserInfo,
  updateProfile,
  updatePassword,
} = require("../controllers/user");

router.route("/register").post(registerValidations, userRegister);
router.route("/login").post(loginValidations, userLogin);
router.route("/whoami").get(verifyUser, getUserInfo);
router.route("/update-profile").put(verifyUser, updateProfile);
router.route("/update-password").put(verifyUser, updatePassword);

module.exports = router;
