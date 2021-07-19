const express = require("express");
const router = express.Router();

const {
  addCategoryHandler,
  getCategories,
} = require("../businessLogic/categoryLogic");

router.post("/createCategory", async function (req, res) {
  try {
    const { name, parent, subCategories } = req.body;
    const category = await addCategoryHandler(name, parent, subCategories);
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

module.exports = router;
