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
exports.getWallpapers = async (req, res) => {
  try {
    const { search, category, price, stock, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    if (category) {
      filter.category = category;
    }
    if (price) {
      filter.price = { $lte: Number(price) }; // Fetch wallpapers with price ≤ given price
    }
    if (stock) {
      filter.stock = Number(stock);
    }

    // Convert page & limit to numbers
    const pageNum = Math.max(1, Number(page)); // Ensure page is at least 1
    const limitNum = Math.max(1, Number(limit)); // Ensure limit is at least 1
    const skip = (pageNum - 1) * limitNum;

    // Get total count (for frontend pagination)
    const total = await Wallpaper.countDocuments(filter);

    // Fetch paginated wallpapers
    const wallpapers = await Wallpaper.find(filter)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      total, // Total number of wallpapers (without pagination)
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      wallpapers, // Paginated wallpapers
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getWallpapersByCategory = async (req, res) => {
  try {
    const category=req.params
    const wallpapers = await Wallpaper.find(category).select('_id title images category price');
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
