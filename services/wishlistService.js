const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // If using Option 1
// const Wishlist = require("../models/Wishlist"); // If using Option 2

// @desc    Get wishlist for a user
// @route   GET /api/v1/wishlist
// @access  Private (User)
exports.getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("wishlist");
  res.status(200).json({ wishlist: user.wishlist });
});

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist/:productId
// @access  Private (User)
exports.addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const productId = req.params.productId;

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
    res
      .status(200)
      .json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } else {
    res.status(400).json({ message: "Product is already in wishlist" });
  }
});

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Private (User)
exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== req.params.productId
  );
  await user.save();
  res.status(200).json({
    message: "Product removed from wishlist",
    wishlist: user.wishlist,
  });
});
