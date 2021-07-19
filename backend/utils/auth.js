const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createToken = (user) => {
  delete user.password;
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
  return token;
};

const checkPassword = async (req, res, next) => {
  const { password, username } = req.body;
  const user = await User.findOne({ username });
  if (user.password !== password) {
    return res.status(401).send({ message: "Incorrect password" });
  } else next();
};

const isAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.slice(7);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) return res.status(401).send({ message: "Invalid Token" });
      next();
    });
  } else return res.status(401).send({ message: "Couldn't find token" });
};

const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.slice(7);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) return res.status(401).send({ message: "Invalid Token" });
      else if (!decode.isAdmin)
        return res.status(401).send({ message: "This is not an admin" });
      next();
    });
  } else return res.status(401).send({ message: "Couldn't find token" });
};

module.exports = { createToken, isAuthenticate, checkPassword, isAdmin };
