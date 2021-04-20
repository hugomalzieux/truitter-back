const Quote = require("../models/quote");
const Subscription = require("../models/subscription");
const jwt = require('jsonwebtoken');

// --------------------------------------------------
//                     SUBSCRIPTIONS
// --------------------------------------------------

// POST
exports.subscribe = (req, res, next) => {
  delete req.body._id;
  const subscription = new Subscription(
    { followerId: getUserId(req.headers.authorization), followedId: req.params.id }
  );
  subscription
    .save()
    .then(() =>
      res.status(201).json({ message: "You follow this account" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// DELETE
exports.unsubscribe = (req, res, next) => {
  Subscription.deleteOne({ followerId: getUserId(req.headers.authorization), followedId: req.params.id })
    .then(() =>
      res
        .status(200)
        .json({ message: `You've unfollow this account!` })
    )
    .catch((error) => res.status(400).json({ error }));
};

getUserId = (authorization) => {
  const token = authorization.split(" ");
  return jwt.decode(token[1]).userId
}
