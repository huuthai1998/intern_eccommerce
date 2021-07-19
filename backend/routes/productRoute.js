const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticate, checkPassword } = require("../utils/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  addProductHandler,
  getCategories,
} = require("../businessLogic/productLogic");

router.post("/createProduct", isAdmin, async function (req, res) {
  try {
    const { product } = req.body;
    const Product = await addProductHandler(product);
    console.log(Product);
    res.status(200).send(Product);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/getAll", async function (req, res) {
  try {
    const Product = await getCategories();
    res.status(200).send(Product);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

module.exports = router;
