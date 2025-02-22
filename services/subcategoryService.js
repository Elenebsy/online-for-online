const factory = require("./handlersFactory");
const Category = require("../models/categoryModel");

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubcategories = factory.getAll(Category);

// @desc    Get specific subcategories by id
// @route   Get /api/v1/subcategories/:id
// @access  Public
exports.getSubcategory = factory.getOne(Category);

// @desc    Create subcategories
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubcategory = factory.createOne(Category);

// @desc    Update specific subcategories
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubcategory = factory.updateOne(Category);

// @desc    Delete specific subcategories
// @route   DELETE /api/v1/subcategories/:id
// @access  Private

exports.deleteSubcategory = factory.deleteOne(Category);
