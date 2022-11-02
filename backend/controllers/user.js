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
        .catch((error) =>
          res.status(400).json({ error: "adresse mail déjà utilisée" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

// Login user
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(403).json({ error: "Utilisateur inconnu" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(403).json({ error: "mot de passe non valide" });
          }
          res.status(200).json({
            user: user,
            token: jwt.sign({ userId: user._id }, process.env.KEY, {
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
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ message: error }));
};

exports.currentUser = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ message: error }));
};

exports.test = (req, res, next) => {
  res.status(200).json({
    userId: req.auth.userId,
    params: req.body,
  });
};

// Edit user profile

exports.modify = (req, res, next) => {
  console.log(req.file);

  if (!req.file) return res.status(406).json("Veuillez choisir une image");

  if (!["image/jpeg", "image/png", "image/gif"].includes(req.file.mimetype))
    return res.status(415).json("Ce format n'est pas autorisé");

  if (req.file.size > 3000000)
    return res.status(415).json("L'image est trop lourde");

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
