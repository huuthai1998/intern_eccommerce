const bcrypt = require("bcrypt");
const SALT_ROUNDS = 5;
const { createToken, isAuthenticate, checkPassword } = require("../utils/auth");
const { findUserByEmail, addUserDb } = require("../dbActions/userdbActions");
const {
  sendVerificationEmail,
  resetPasswordEmail,
} = require("../utils/mailingConfig");

const createUser = async (user) => {
  try {
    let inputUser = await findUserByEmail(user.email);
    if (inputUser) throw "Email has already used";
    else {
      inputUser = {
        ...user,
      };
      const hash = await bcrypt.hash(inputUser.password, SALT_ROUNDS);
      inputUser.password = hash;
      const { _doc } = await addUserDb(inputUser);
      inputUser = { ..._doc, token: createToken(_doc) };
      delete inputUser.password;
      const url = `http://localhost:5000/user/verifyEmail/${inputUser.token}`;
      // sendVerificationEmail(user.email, url);
      return inputUser;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createAdmin = async () => {
  try {
    const hash = await bcrypt.hash("AdminPassword123!", SALT_ROUNDS);
    let { _doc } = await addUserDb({
      name: "Admin",
      email: "admin@ad.gg",
      password: hash,
      isAdmin: true,
    });
    return { ..._doc, token: createToken(_doc) };
  } catch (err) {
    console.log(err);
  }
};

const logIn = async (email, password) => {
  try {
    let user = await findUserByEmail(email);
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        delete user.password;
        user.token = createToken(user.toJSON());
        return user;
      } else throw "Password is incorrect";
    } else throw "Email not found";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { createAdmin, createUser, logIn };
