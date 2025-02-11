const express = require("express");
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/authController");
const validate = require("../middlewares/validateMiddleware");
const {
  registerValidation,
  loginValidation,
} = require("../utils/userValidation");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});
router.get("/logout",verifyToken, logout);
router.get("/refresh-token", refreshToken); // Auto-renews JWT if close to expiry

module.exports = router;
