const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/auth");

const {
  addProductHandler,
  getProducts,
  deleteProductHandler,
  getCategoryPaginationLogic,
  getProductById,
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

router.get("/get/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const Product = await getProductById(id);
    res.status(200).send(Product);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.post("/deleteProduct", isAdmin, async function (req, res) {
  try {
    const { _id } = req.body;
    const Product = await deleteProductHandler(_id);
    console.log(Product);
    res.status(200).send(Product);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/getAll", async function (req, res) {
  try {
    const Product = await getProducts();
    res.status(200).send(Product);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.post("/getByCategory", async function (req, res) {
  try {
    let { skip, limit, category, size, available, brand, color } = req.body;
    skip = skip ? skip : 0;
    limit = limit ? limit : 2;
    console.log(skip, limit, category, size, available);
    const Product = await getCategoryPaginationLogic(
      skip,
      limit,
      category,
      size,
      available,
      brand,
      color
    );
    res.status(200).send(Product);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

module.exports = router;