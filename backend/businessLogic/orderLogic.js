const {
  getAllOrdersDb,
  addOrderDb,
  findOrderDb,
  deleteOrderDb,
} = require("../dbActions/orderdbActions");
const { findProductByIdDb } = require("../dbActions/productdbActions");
const { orderConfirmationEmail } = require("../utils/mailingConfig");

const addOrderHandler = async (buyer, items, subTotal, email) => {
  try {
    let productString = "";
    items.forEach(async (e, idx) => {
      const product = await findProductByIdDb(e.product);
      product.sold += parseInt(e.quantity);
      product.save();
      if (idx !== 0)
        productString += `, ${product.name} (${e.size}) X ${e.quantity}`;
      else productString += `${product.name} (${e.size}) X ${e.quantity}`;
      if (idx === items.length - 1)
        orderConfirmationEmail(email, subTotal, productString);
    });

    const Order = await addOrderDb({ buyer, items, subTotal });
    return Order;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getOrders = async () => {
  try {
    const orders = await getAllOrdersDb();
    return orders;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteOrderHandler = async (_id) => {
  try {
    const Order = await deleteOrderDb(_id);
    return Order;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const changeStatusOrderHandler = async (_id, status) => {
  try {
    const Order = await findOrderDb(_id);
    Order.status = status;
    Order.save();
    return Order;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addOrderHandler,
  getOrders,
  deleteOrderHandler,
  changeStatusOrderHandler,
};
