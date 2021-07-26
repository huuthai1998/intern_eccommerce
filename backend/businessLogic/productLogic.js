const { findCategoryDb } = require("../dbActions/categorydbActions");
const {
  getAllProductsDb,
  addProductDb,
  deleteProductDb,
  getCategoryPaginationDb,
  countByCategory,
  getProductDb,
} = require("../dbActions/ProductdbActions");

const addProductHandler = async (product) => {
  try {
    let categoriesArray = await Promise.all(
      product.categories.map(async (e) => {
        const category = await findCategoryDb(e);
        return category;
      })
    );
    console.log(categoriesArray);
    const prodAdd = { ...product, categories: categoriesArray };
    const Product = await addProductDb(prodAdd);
    return Product;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProducts = async () => {
  try {
    const products = await getAllProductsDb();
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProductById = async (id) => {
  try {
    const product = await getProductDb(id);
    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteProductHandler = async (_id) => {
  try {
    const Product = await deleteProductDb(_id);
    return Product;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getCategoryPaginationLogic = async (
  skip,
  limit,
  category,
  size,
  available,
  brand,
  color
) => {
  try {
    available = available === null ? undefined : available;
    size = size === null ? undefined : size;
    const products = await getCategoryPaginationDb(
      skip,
      limit,
      category,
      size,
      available,
      brand,
      color
    );
    const count = await countByCategory(
      category,
      size,
      available,
      brand,
      color
    );
    return { products, count };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addProductHandler,
  getProducts,
  deleteProductHandler,
  getCategoryPaginationLogic,
  getProductById,
};
