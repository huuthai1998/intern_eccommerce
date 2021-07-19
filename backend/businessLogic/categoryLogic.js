const {
  getAllCategoriesDb,
  addCategoryDb,
  findCategoryDb,
} = require("../dbActions/categorydbActions");

const addCategoryHandler = async (name, parent, subCategories) => {
  try {
    if (parent === undefined) {
      const category = await addCategoryDb(name, subCategories);
      return category;
    } else {
      const parentCategory = await findCategoryDb(parent);
      parentCategory.subCategories = [...parentCategory.subCategories, name];
      parentCategory.save();
      return parentCategory;
    }
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

module.exports = { addCategoryHandler, getCategories };
