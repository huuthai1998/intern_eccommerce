const {
  getAllCategoriesDb,
  addProductDb,
  findProductDb,
} = require("../dbActions/ProductdbActions");

const addProductHandler = async (product) => {
  try {
    const Product = await addProductDb(product);
    return Product;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getCategories = async () => {
  try {
    const categories = await getAllCategoriesDb();
    return categories;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const te = async (name, parent) => {
  try {
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { addProductHandler, getCategories };
