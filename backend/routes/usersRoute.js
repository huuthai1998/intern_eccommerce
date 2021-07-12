var express = require("express");
var router = express.Router();

// router.get("/createAdmin", async function (req, res, next) {
//   try {
//     const user = await User.create({
//       name: "Ad11",
//       username: "ad1",
//       email: "admi1n@god.gg",
//       password: "1",
//       isAdmin: true,
//     });
//     res.send(user);
//   } catch (err) {
//     res.send({ msg: err.message });
//   }
// });

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

// router.post("/signIn", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       $or: [
//         { email: req.body.username, password: req.body.password },
//         { username: req.body.username, password: req.body.password },
//       ],
//     });
//     if (user) {
//       res.send({
//         _id: user.id,
//         email: user.email,
//         name: user.name,
//         username: user.username,
//         isAdmin: user.isAdmin,
//         address: user.address,
//         token: createToken(user),
//       });
//     } else {
//       res.status(401).send({});
//     }
//   } catch (err) {
//     res.send(err);
//   }
// });

// router.post("/signUp", async (req, res) => {
//   try {
//     let user = {
//       ...req.body,
//       isAdmin: false,
//     };
//     const { _doc } = await User.create(user);
//     user = { ..._doc, token: createToken(req.body) };
//     console.log(user);
//     res.status(201).send(user);
//   } catch (err) {
//     console.log(err.message);
//     res.status(401).send({ msg: err.message });
//   }
// });

module.exports = router;
