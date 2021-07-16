const bcrypt = require("bcrypt");
const SALT_ROUNDS = 5;
const jwt = require("jsonwebtoken");
const { createToken, isAuthenticate, checkPassword } = require("../utils/auth");
const {
  findUserByEmail,
  addUserDb,
  verifyEmail,
  changePasswordByEmail,
} = require("../dbActions/userdbActions");
const {
  sendVerificationEmail,
  resetPasswordEmail,
} = require("../utils/mailingConfig");

const validateEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(input).toLowerCase());
};

const createUser = async (user) => {
  try {
    if (!validateEmail(user.email)) throw "Invalid Email format";

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

const resetPassword = async (password, token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const { email } = decode;
    password = hash;
    const user = await changePasswordByEmail(email, password);
    if (user === null) throw "Email not found";
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const forgotPassword = async (email) => {
  try {
    const user = await findUserByEmail(email);
    if (user !== null) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const url = `http://localhost:3000/reset/${token}`;
      resetPasswordEmail(email, url);
    } else throw "Email not found";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const verifyEmailLogic = async (token) => {
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await verifyEmail(_id);
    if (user === null) throw "Email not found";
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createAdmin,
  createUser,
  logIn,
  resetPassword,
  verifyEmailLogic,
  forgotPassword,
};
