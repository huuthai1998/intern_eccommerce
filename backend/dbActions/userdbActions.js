const User = require("../models/user");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 5;
const { createToken, isAuthenticate, checkPassword } = require("../utils/auth");

const findUserByEmail = (email) => {
  return User.findOne({
    email,
  });
};

const addUserDb = (user) => {
  return User.create(user);
};

const changePasswordByEmail = (email, password) => {
  return User.findOneAndUpdate({ email }, { password });
};

const verifyEmail = (_id) => {
  return User.findOneAndUpdate({ _id }, { isVerified: true });
};
module.exports = {
  findUserByEmail,
  addUserDb,
  changePasswordByEmail,
  verifyEmail,
};
