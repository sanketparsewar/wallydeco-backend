const express = require("express");
const router = express.Router();
const authController=require('../controllers/authController')

router.post("/register", authController.registerUser); // Register a new user
router.post("/login", authController.loginUser); // Login a user

module.exports = router;
