const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post(
//   "/register/doctor",
//   verifyToken,
//   isAdmin,
//   authController.registerDoctor
// );

module.exports = router;
