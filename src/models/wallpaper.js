const mongoose=require('mongoose');

const wallpaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    size: { type: String },
    colorOptions: [String],
    stock: { type: Number, default: 0 },
    images: [String],
  },{timestamps:true});
  
  module.exports = mongoose.model('Wallpaper', wallpaperSchema);
  