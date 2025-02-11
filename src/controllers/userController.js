// userController.js
const User = require("../models/user");
// const {
//   validateUserRegistration,
//   validateUserLogin,
//   validateUserUpdate,
// } = require("../service/validation");

// Update user
// exports.updateUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { name, email, role, phone, image, orders, address } = req.body;
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { name, email, role, phone, image, orders, address },
//       {
//         new: true,
//       }
//     );
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
