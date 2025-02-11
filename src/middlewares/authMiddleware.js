const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Read JWT from cookie

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user data from database
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach full user object to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
