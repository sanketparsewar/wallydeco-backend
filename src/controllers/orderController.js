const Order = require('../models/order');
const { validateOrder, validateOrderStatusUpdate } = require('../service/validation');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Create a new order
// exports.createOrder = [
//   ...validateOrder,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       const order = new Order(req.body);
//       const savedOrder = await order.save();
//       res.status(201).json(savedOrder);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   },
// ];

// Update order status
// exports.updateOrderStatus = [
//   ...validateOrderStatusUpdate,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
//       if (!order) return res.status(404).json({ message: 'Order not found' });
//       res.status(200).json(order);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   },
// ];





// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('items.wallpaperId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('items.wallpaperId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
