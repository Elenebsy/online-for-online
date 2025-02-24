const express = require("express");

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");

const router = express.Router();

router.route("/").get(getBrands).post(createBrand);

router.route("/:id").get(getBrand).put(updateBrand).delete(deleteBrand);

module.exports = router;
