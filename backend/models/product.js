const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  brand: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
  },
  categories: { required: true, type: [String] },
  price: {
    required: true,
    type: Number,
    min: 0,
  },
  numReviews: {
    type: Number,
    min: 0,
  },
  quantity: {
    required: true,
    type: Number,
    min: 0,
  },
  photos: {
    type: [String],
  },
  colors: { required: true, type: [String] },
  size: { required: true, type: [String] },
});

module.exports = mongoose.model("Product", productSchema);
