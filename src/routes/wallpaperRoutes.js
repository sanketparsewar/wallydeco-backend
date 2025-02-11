const express = require("express");
const router = express.Router();
const {
  addWallpaper,
  updateWallpaper,
  getAllWallpapers,
  getWallpaperById,
  deleteWallpaper,
} = require("../controllers/wallpaperController");
const validate = require("../middlewares/validateMiddleware");
const {
  WallpaperValidation,
} = require("../utils/wallpaperValidation");

router.post("/", validate(WallpaperValidation), addWallpaper);
router.put("/:id", validate(WallpaperValidation), updateWallpaper); // Update a wallpaper
router.get("/:id", getWallpaperById);
router.get("/", getAllWallpapers);
router.delete("/:id", deleteWallpaper);

module.exports = router;
