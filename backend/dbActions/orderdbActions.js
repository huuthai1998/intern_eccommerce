const Order = require("../models/order");

const findOrderDb = (_id) => {
  return Order.findOne({ _id });
};

const addOrderDb = (order) => {
  return Order.create(order);
};

const getAllOrdersDb = () => {
  return Order.find({}).sort("-createdAt");
};

const deleteOrderDb = (_id) => {
  return Order.deleteOne({ _id: _id });
};

const cancelOrderDb = (_id) => {
  return Order.deleteOne({ _id: _id });
};

module.exports = {
  addOrderDb,
  findOrderDb,
  getAllOrdersDb,
  deleteOrderDb,
  cancelOrderDb,
};
