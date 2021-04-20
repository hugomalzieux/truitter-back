const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const Quote = require("../models/quote")

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User(
        Object.assign({}, req.body, {
          password: hash,
          darkMode: false
        })
      );
      user
        .save()
        .then(() =>
          res
            .status(201)
            .json({
              message: `User ${req.body.firstName} ${req.body.lastName} created !`,
            })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "invalid credentials !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// GET ONE
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) =>
      Quote.find({ userId: req.params.id })
        .then((quotes) => res.status(200).json({ user, quotes }))
        .catch((error) => res.status(400).json({ error }))
    )
    .catch((error) => res.status(400).json({ error }));
};
