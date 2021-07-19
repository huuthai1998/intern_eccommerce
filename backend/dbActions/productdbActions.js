const Product = require("../models/product");

const findProductDb = (name) => {
  return Product.findOne({ name });
};

const addProductDb = (product) => {
  return Product.create(product);
};

const addSubProductDb = (subCategories, parent) => {
  return Product.findOneAndUpdate({ name: parent }, { subCategories });
};

const getAllCategoriesDb = (name) => {
  return Product.find({});
};

module.exports = {
  addSubProductDb,
  addProductDb,
  findProductDb,
  getAllCategoriesDb,
};
