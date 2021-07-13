const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { createToken, isAuthenticate, checkPassword } = require("../utils/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendVerificationEmail,
  resetPasswordEmail,
} = require("../utils/mailingConfig");
const SALT_ROUNDS = 5;

//Create a seller account
router.get("/createAdmin", async function (req, res, next) {
  try {
    bcrypt.hash("AdminPassword123!", SALT_ROUNDS, async (err, hash) => {
      var user = await User.create({
        name: "Admin",
        email: "admin@ad.gg",
        password: hash,
        isAdmin: true,
      });
      res.send(user);
    });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

//Create user account
router.post("/signUp", async (req, res) => {
  try {
    let user = {
      ...req.body,
      isAdmin: false,
    };
    bcrypt.hash(user.password, SALT_ROUNDS, async (err, hash) => {
      user.password = hash;
      const { _doc } = await User.create(user);
      console.log(_doc);
      user = { ..._doc, token: createToken(_doc) };
      delete user.password;
      const url = `http://localhost:5000/user/verifyEmail/${user.token}`;
      sendVerificationEmail(user.email, url);
      res.status(201).send(user);
    });
  } catch (err) {
    console.log(err.message);
    res.status(401).send({ msg: err.message });
  }
});

// router.put("/:id", isAuthenticate, checkPassword, async (req, res) => {
//   const { name, username, address, email, newPassword } = req.body;
//   try {
//     if (newPassword === undefined)
//       await User.updateOne(
//         { username },
//         { $set: { name, username, address, email } }
//       );
//     else {
//       await User.updateOne({ username }, { $set: { password: newPassword } });
//     }

//     res.send({ message: "Success" });
//   } catch (err) {
//     res.send({ msg: err.message });
//   }
// });

// router.get("/verifyLogin", isAuthenticate, (req, res) => {
//   return res.send({ isAuth: true });
// });

router.post("/signIn", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, isEqual) {
        if (isEqual) {
          res.send({
            _id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            isAdmin: user.isAdmin,
            address: user.address,
            token: createToken(user),
          });
        }
      });
    } else res.status(401).send("Email or password is incorrect");
  } catch (err) {
    res.send(err);
  }
});

router.post("/forgotPassword/", async (req, res) => {
  const email = req.body.email;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const url = `http://localhost:3001/reset/${token}`;
  resetPasswordEmail(email, url);
  res.status(200).send("Reset password email sent");
});

router.get("/verifyEmail/:token", async (req, res) => {
  const token = req.params.token;
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOneAndUpdate({ _id }, { isVerified: true });
  res.status(200).send("Thank you for verifying your email");
});

router.get("/verifyToken/:token", async (req, res) => {
  const token = req.params.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return res.status(401).send({ message: "Invalid Token" });
    else res.status(200).send("OK");
  });
});

module.exports = router;
