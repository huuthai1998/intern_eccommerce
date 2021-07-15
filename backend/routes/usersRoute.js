const express = require("express");
const router = express.Router();
const { createToken, isAuthenticate, checkPassword } = require("../utils/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendVerificationEmail,
  resetPasswordEmail,
} = require("../utils/mailingConfig");

const {
  logIn,
  createAdmin,
  createUser,
  resetPassword,
  verifyEmailLogic,
  forgotPassword,
} = require("../businessLogic/userLogic");

//Create a seller account
router.get("/createAdmin", async function (req, res, next) {
  try {
    const user = await createAdmin();
    res.send(user);
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
});

//Create user account
router.post("/signUp", async (req, res) => {
  try {
    let user = await createUser(req.body);
    console.log("kk", user);
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: err });
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
    const user = await logIn(req.body.email, req.body.password);
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/forgotPassword/", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await forgotPassword(email);

    res.status(200).send("Reset password email sent");
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/verifyEmail/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await verifyEmailLogic(token);
    res.status(200).send("Thank you for verifying your email");
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/verifyToken/:token", async (req, res) => {
  const token = req.params.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return res.status(401).send({ message: "Invalid Token" });
    else res.status(200).send("OK");
  });
});

router.put("/resetPassword/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const user = await resetPassword(req.body.password, token);
    console.log(user);
    res.status(201).send(user);
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;
