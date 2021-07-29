const { findCategoryDb } = require("../dbActions/categorydbActions");
const {
  getAllProductsDb,
  addProductDb,
  deleteProductDb,
  getCategoryPaginationDb,
  countByCategory,
  getProductDb,
  findProductDb,
  findProductByIdDb,
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

const updateProductHandler = async (product) => {
  try {
    let categoriesArray = undefined;
    if (product.categories)
      categoriesArray = await Promise.all(
        product.categories.map(async (e) => {
          const category = await findCategoryDb(e);
          return category;
        })
      );
    console.log(product.id);
    let updateProduct = await findProductByIdDb(product.id);

    updateProduct.categories = categoriesArray
      ? categoriesArray
      : updateProduct.categories;
    updateProduct.name = product.name ? product.name : updateProduct.name;
    updateProduct.description = product.description
      ? product.description
      : updateProduct.description;
    updateProduct.price = product.price ? product.price : updateProduct.price;
    updateProduct.color = product.color ? product.color : updateProduct.color;
    updateProduct.size = product.size ? product.size : updateProduct.size;
    updateProduct.quantity = product.quantity
      ? product.quantity
      : updateProduct.quantity;
    updateProduct.brand = product.brand ? product.brand : updateProduct.brand;
    updateProduct.photos = product.photos
      ? product.photos
      : updateProduct.photos;
    updateProduct.save();
    return updateProduct;
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
  color,
  sort,
  name
) => {
  try {
    available = available === null ? undefined : available;
    size = size === null ? undefined : size;
    let sortObj = "";
    switch (sort) {
      case "popularity":
        sortObj = "sold";
        break;
      case "nameAsc":
        sortObj = "name";
        break;
      case "priceAsc":
        sortObj = "price";
        break;
      case "priceDesc":
        sortObj = "-price";
        break;
      default:
        sortObj = "";
    }
    let nameHandle = [];
    nameHandle = name
      ? [
          { name: { $regex: name, $options: "i" } },
          { brand: { $regex: name, $options: "i" } },
        ]
      : [{ name: { $ne: null } }];
    const products = await getCategoryPaginationDb(
      skip,
      limit,
      category,
      size,
      available,
      brand,
      color,
      sortObj,
      nameHandle
    );
    const count = await countByCategory(
      category,
      size,
      available,
      brand,
      color,
      nameHandle
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
  updateProductHandler,
};
