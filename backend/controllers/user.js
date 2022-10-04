const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup user
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "user created !" }))
        .catch((error) => res.status(400).json({ message: error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Login user
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Invalid password !" });
          }
          res.status(200).json({
            user: user,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Get user
exports.getById = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ message: error }));
};

exports.currentUser = (req, res, next) => {
  User.findOne({ _id: req.user.userId })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ message: error }));
};

exports.test = (req, res, next) => {
  res.status(200).json({
    userId: req.auth.userId,
    params: req.body,
  });
};

// Edit user profile
// exports.modify = (req, res, next) => {
//   const userObject = req.file;
//   console.log(userObject)
//     ? {
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };
//   User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
//     .then(() => res.status(200).json({ message: "User updated" }))
//     .catch((error) => res.status(400).json({ error }));
// };

exports.modify = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    }
  )
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err.messageId));
};
