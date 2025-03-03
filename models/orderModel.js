const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        color: String,
        price: {
          type: Number,
          required: true,
          min: [0, "Price must be positive"],
        },
      },
    ],
    taxPrice: {
      type: Number,
      default: 0,
      min: [0, "Tax price must be positive"],
    },
    shippingAddress: {
      details: { type: String, required: true },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^(\+?\d{1,3})?\d{10}$/.test(v);
          },
          message: "Invalid phone number format",
        },
      },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    shippingPrice: {
      type: Number,
      default: 0,
      min: [0, "Shipping price must be positive"],
    },
    totalOrderPrice: {
      type: Number,
      required: true,
      min: [0, "Total order price must be positive"],
    },
    paymentMethodType: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
