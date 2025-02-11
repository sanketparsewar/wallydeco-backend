const express = require("express");
require("dotenv").config();
const connectDB = require("./database/configdb");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const verifyToken=require('./middlewares/authMiddleware')


// Routes
const authRoutes = require("./routes/authRoutes");
const wallpaperRoutes = require("./routes/wallpaperRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:4200", // Allow Angular frontend
    credentials: true, // Allow cookies & authentication headers
  })
);

// Database connection
connectDB
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallpaper",verifyToken, wallpaperRoutes);
app.use("/api/user",verifyToken, userRoutes);
app.use("/api/order",verifyToken, orderRoutes);
app.use("/api/upload",verifyToken, cloudinaryRoutes);

module.exports = app;
