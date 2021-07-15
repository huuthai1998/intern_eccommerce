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

module.exports = { findUserByEmail, addUserDb };
