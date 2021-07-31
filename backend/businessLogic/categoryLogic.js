const {
  getAllCategoriesDb,
  addCategoryDb,
  findCategoryDb,
  deleteCategoryDb,
  getParentsCategoriesDb,
  getSubCategoriesDb,
} = require("../dbActions/categorydbActions");

const addCategoryHandler = async (name, parents, subCategories) => {
  try {
    console.log(parents, name);
    subCategories = subCategories ? subCategories : [];

    if (parents === undefined) {
      const category = await addCategoryDb(name, null);
      subCategories.forEach(async (e) => {
        const addedSub = await addCategoryDb(e, category, []);
      });
      category.save();

      return category;
    } else {
      const parentsCategory = await findCategoryDb(parents);
      console.log("parent: ", parentsCategory);
      const category = await addCategoryDb(name, parentsCategory);
      console.log("added: ", category);
      return category;
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

const getParentsCategories = async () => {
  try {
    const categories = await getParentsCategoriesDb();
    return categories;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getSubCategories = async () => {
  try {
    const categories = await getSubCategoriesDb();
    return categories;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getCategoryByName = async (name) => {
  try {
    const category = await findCategoryDb(name);
    return category;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteCategoryHandler = async (_id) => {
  try {
    const Category = await deleteCategoryDb(_id);
    return Category;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addCategoryHandler,
  getCategories,
  deleteCategoryHandler,
  getParentsCategories,
  getSubCategories,
  getCategoryByName,
};
