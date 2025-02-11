// userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const validate = require("../middlewares/validateMiddleware");
const { updateUserValidation } = require("../utils/userValidation");

router.get("/:id", getUserById);
router.put("/:id", validate(updateUserValidation), updateUser);
router.delete("/:id", deleteUser);



module.exports = router;
