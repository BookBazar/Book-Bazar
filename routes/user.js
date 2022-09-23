const router = require("express").Router();

const verifyUser = require("../middlewares/verifyUser");

const {
  userLogin,
  loginValidations,
  userRegister,
  registerValidations,
  getUserInfo,
} = require("../controllers/user");

router.route("/register").post(registerValidations, userRegister);
router.route("/login").post(loginValidations, userLogin);
router.route("/whoami").get(verifyUser, getUserInfo);

module.exports = router;
