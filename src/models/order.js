const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      wallpaper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallpaper",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Shipped", "Delivered"], 
    default: "Pending"
  },  
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
},{timestamps:true});

module.exports = mongoose.model("Order", orderSchema);
