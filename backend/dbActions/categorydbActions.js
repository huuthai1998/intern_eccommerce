const { categoryModel: Category } = require("../models/category");

const findCategoryDb = (name) => {
  return Category.findOne({ name });
};

const addCategoryDb = (name, subCategories) => {
  return Category.create({ name, subCategories });
};

const addSubCategoryDb = (subCategories, parent) => {
  return Category.findOneAndUpdate({ name: parent }, { subCategories });
};

const getAllCategoriesDb = (name) => {
  return Category.find({});
};

module.exports = {
  addSubCategoryDb,
  addCategoryDb,
  findCategoryDb,
  getAllCategoriesDb,
};
