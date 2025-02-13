const express = require("express");
const router = express.Router();
const {
  addWallpaper,
  updateWallpaper,
  getWallpapers,
  getWallpaperById,
  deleteWallpaper,
  getWallpapersByCategory,
} = require("../controllers/wallpaperController");
const validate = require("../middlewares/validateMiddleware");
const {
  WallpaperValidation,
} = require("../utils/wallpaperValidation");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/",verifyToken, validate(WallpaperValidation), addWallpaper);
router.put("/:id",verifyToken, validate(WallpaperValidation), updateWallpaper); // Update a wallpaper
router.get("/:id", getWallpaperById);
router.get("/", getWallpapers);
router.get("/category/:category", getWallpapersByCategory);
router.delete("/:id",verifyToken, deleteWallpaper);

module.exports = router;
