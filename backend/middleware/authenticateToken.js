// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (token == null) return res.sendStatus(401);

//     /* todo : récuperer le token secret dans le .env */
//     jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, user) => {
//       if (err) {
//         return res.sendStatus(401);
//       }
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     res.status(401).json({ error });
//   }
// };
