const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Routes for orders
// router.post("/", orderController.createOrder); // Create a new order
router.get("/", orderController.getAllOrders); // Get all orders
router.get("/:id", orderController.getOrderById); // Get order by ID
// router.put("/:id", orderController.updateOrderStatus); // Update order status
router.delete("/:id", orderController.deleteOrder); // Delete an order

module.exports = router;
