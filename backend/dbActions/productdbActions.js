const Product = require("../models/product");

const findProductDb = (name) => {
  return Product.findOne({ name });
};

const findProductByIdDb = (_id) => {
  return Product.findOne({ _id });
};

const getProductByBrandDb = (brand) => {
  return Product.find({ brand }).limit(4);
};

const addProductDb = (product) => {
  return Product.create(product);
};

const deleteProductDb = (_id) => {
  return Product.deleteOne({ _id: _id });
};

const getAllProductsDb = () => {
  return Product.find({}).sort("-createdAt");
};

const getProductDb = (_id) => {
  return Product.findOne({ _id });
};

const getCategoryPaginationDb = (
  skip,
  limit,
  category,
  size,
  available,
  brand,
  color,
  sort,
  name
) => {
  return Product.find({
    $or: name,
    "categories.name": `${category}`,
    size: size !== undefined ? size : { $ne: null },
    colors: color !== undefined ? color : { $ne: null },
    brand: brand !== undefined ? brand : { $ne: null },
    $expr:
      available === undefined
        ? { $gt: ["$quantity", 1] }
        : available === "available"
        ? { $gt: ["$quantity", "$sold"] }
        : { $eq: ["$quantity", "$sold"] },
  })
    .skip(skip * limit)
    .limit(limit)
    .sort(sort);
};

const countByCategory = (category, size, available, brand, color, name) => {
  console.log({
    "categories.name": `${category}`,
    size: size !== undefined ? size : { $ne: null },
    colors: color !== undefined ? color : { $ne: null },
    brand: brand !== undefined ? brand : { $ne: null },
    $expr:
      available === undefined
        ? { $gt: ["$quantity", 0] }
        : available === "available"
        ? { $gt: ["$quantity", "$sold"] }
        : { $eq: ["$quantity", "$sold"] },
  });
  return Product.countDocuments({
    $or: name,
    "categories.name": `${category}`,
    "categories.name": `${category}`,
    size: size !== undefined ? size : { $ne: null },
    colors: color !== undefined ? color : { $ne: null },
    brand: brand !== undefined ? brand : { $ne: null },
    $expr:
      available === undefined
        ? { $gt: ["$quantity", 0] }
        : available === "available"
        ? { $gt: ["$quantity", "$sold"] }
        : { $eq: ["$quantity", "$sold"] },
  });
};

module.exports = {
  deleteProductDb,
  addProductDb,
  findProductDb,
  getAllProductsDb,
  getCategoryPaginationDb,
  countByCategory,
  getProductDb,
  findProductByIdDb,
  getProductByBrandDb,
};
