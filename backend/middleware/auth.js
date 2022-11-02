const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.KEY);

    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
    console.log("req.auth", req.auth);
  } catch (error) {
    res.status(401).json({ error });
  }
};
