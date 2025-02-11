const express = require('express');
const router = express.Router();
const wallpaperController = require('../controllers/wallpaperController');

// Routes for wallpapers
router.post('/', wallpaperController.createWallpaper); // Create a wallpaper
router.get('/', wallpaperController.getAllWallpapers); // Get all wallpapers
router.get('/:id', wallpaperController.getWallpaperById); // Get wallpaper by ID
router.put('/:id', wallpaperController.updateWallpaper); // Update a wallpaper
router.delete('/:id', wallpaperController.deleteWallpaper); // Delete a wallpaper

module.exports = router;
