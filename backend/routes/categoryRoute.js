const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/auth");

const {
  addCategoryHandler,
  getCategories,
  deleteCategoryHandler,
  getParentsCategories,
  getSubCategories,
  getCategoryByName,
} = require("../businessLogic/categoryLogic");

router.post("/createCategory", isAdmin, async function (req, res) {
  try {
    const { name, parents, subCategories } = req.body.category;
    console.log(name, parents, subCategories);
    const category = await addCategoryHandler(name, parents, subCategories);
    res.status(200).send(category);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/getAll", async function (req, res) {
  try {
    const category = await getCategories();
    res.status(200).send(category);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/getParents", async function (req, res) {
  try {
    const category = await getParentsCategories();
    res.status(200).send(category);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/getSub", async function (req, res) {
  try {
    const category = await getSubCategories();
    res.status(200).send(category);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.post("/deleteCategory", isAdmin, async function (req, res) {
  try {
    const { _id } = req.body;
    const Category = await deleteCategoryHandler(_id);
    console.log(Category);
    res.status(200).send(Category);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/getCategory/:name", async function (req, res) {
  try {
    const { name } = req.params;
    const Category = await getCategoryByName(name);
    console.log(Category);
    res.status(200).send(Category);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

module.exports = router;
