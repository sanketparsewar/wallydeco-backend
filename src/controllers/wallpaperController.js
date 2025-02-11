const Wallpaper = require("../models/wallpaper");

// Create a new wallpaper
exports.addWallpaper = async (req, res) => {
  
  try {
    const wallpaper = new Wallpaper(req.body);
    const savedWallpaper = await wallpaper.save();
    res.status(201).json(savedWallpaper);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all wallpapers
exports.getAllWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find();
    res.status(200).json(wallpapers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a wallpaper by ID
exports.getWallpaperById = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findById(req.params.id);
    if (!wallpaper)
      return res.status(404).json({ message: "Wallpaper not found" });
    res.status(200).json(wallpaper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWallpaper = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!wallpaper) return res.status(404).json({ message: 'Wallpaper not found' });
    res.status(200).json(wallpaper);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a wallpaper
exports.deleteWallpaper = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findByIdAndDelete(req.params.id);
    if (!wallpaper)
      return res.status(404).json({ message: "Wallpaper not found" });
    res.status(200).json({ message: "Wallpaper deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
