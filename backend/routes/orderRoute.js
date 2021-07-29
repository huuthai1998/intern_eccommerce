const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/auth");

const {
  addOrderHandler,
  getOrders,
  deleteOrderHandler,
  changeStatusOrderHandler,
} = require("../businessLogic/OrderLogic");

router.post("/createOrder", async function (req, res) {
  try {
    const { buyer, items, subTotal, email } = req.body;
    const Order = await addOrderHandler(buyer, items, subTotal, email);
    res.status(200).send(Order);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.get("/getAll", async function (req, res) {
  try {
    const Orders = await getOrders();
    res.status(200).send(Orders);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.post("/deleteOrder", isAdmin, async function (req, res) {
  try {
    const { _id } = req.body;
    const Order = await deleteOrderHandler(_id);
    console.log(Order);
    res.status(200).send(Order);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

router.put("/markOrder", isAdmin, async function (req, res) {
  try {
    const { status, _id } = req.body;
    console.log(status);

    if (status !== "Pending" && status !== "Completed" && status !== "Canceled")
      res.status(304).send({ msg: "Invalid status code" });
    else {
      const Order = await changeStatusOrderHandler(_id, status);
      console.log(Order);
      res.status(200).send(Order);
    }
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

module.exports = router;
