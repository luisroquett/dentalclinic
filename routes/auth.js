const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
  "/register/doctor",
  verifyToken,
  isAdmin,
  authController.registerDoctor
);

module.exports = router;