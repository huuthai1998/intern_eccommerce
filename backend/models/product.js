const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const productSchema = new mongoose.Schema(
  {
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
    categories: { required: true, type: [categorySchema], sparse: true },
    price: {
      required: true,
      type: Number,
      min: 0,
    },
    numReviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    sold: {
      type: Number,
      min: 0,
      default: 0,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
