const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
} = require("../service/validation");

(exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    await user.save();
    res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    res.status(400).json({ message: "Registration failed." });
  }
}),
  (exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Login user
// exports.loginUser = [
//   ...validateUserLogin,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user || user.password !== password) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }
//       res.status(200).json({ message: "Login successful", user });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   },
// ];
