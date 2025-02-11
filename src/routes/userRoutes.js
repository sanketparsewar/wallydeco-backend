// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for users
// router.post('/register', userController.registerUser); // Register a new user
// router.post('/login', userController.loginUser); // Login a user
router.get('/:id', userController.getUserById); // Get user by ID
router.put('/:id', userController.updateUser); // Update a user
router.delete('/:id', userController.deleteUser); // Update a user

module.exports = router;
