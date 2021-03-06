const { categoryModel: Category } = require("../models/category");

const findCategoryDb = (name) => {
  return Category.findOne({ name });
};

const addCategoryDb = (name, parent) => {
  return Category.create({ name, parent });
};

const getAllCategoriesDb = (name) => {
  return Category.find({});
};

const getParentsCategoriesDb = (name) => {
  return Category.find({ parent: null });
};

const getSubCategoriesDb = (name) => {
  return Category.find({ parent: { $ne: null } });
};

const deleteCategoryDb = (_id) => {
  return Category.deleteOne({ _id: _id });
};

module.exports = {
  addCategoryDb,
  findCategoryDb,
  getAllCategoriesDb,
  deleteCategoryDb,
  getParentsCategoriesDb,
  getSubCategoriesDb,
};
