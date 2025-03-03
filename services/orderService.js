const factory = require("./handlersFactory");
const Order = require("../models/orderModel");

// @desc    Get list of orders
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.getOrders = factory.getAll(Order, [
  { path: "user", select: "name email" },
  { path: "cartItems.product", select: "name price" },
]);

// @desc    Get specific order by id
// @route   GET /api/v1/orders/:id
// @access  Private/Admin
exports.getOrder = factory.getOne(Order, [
  { path: "user", select: "name email" },
  { path: "cartItems.product", select: "name price" },
]);

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private/User
exports.createOrder = factory.createOne(Order);

// @desc    Update specific order (PATCH instead of PUT)
// @route   PATCH /api/v1/orders/:id
// @access  Private/Admin
exports.updateOrder = factory.updateOne(Order);

// @desc    Delete specific order
// @route   DELETE /api/v1/orders/:id
// @access  Private/Admin
exports.deleteOrder = factory.deleteOne(Order);
