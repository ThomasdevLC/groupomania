const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.KEY);
    const userId = decodedToken.userId;

    User.findOne({ _id: userId }).then((user) => {
      req.auth = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};
