const Quote = require("../models/quote");
const subscriptionCtrl = require("./subscription");
const Subscription = require("../models/subscription");
const jwt = require('jsonwebtoken');

// --------------------------------------------------
//                     QUOTES
// --------------------------------------------------

// GET
exports.getAllQuotesFromTimeline = (req, res, next) => {
  Subscription.find({ followerId: getUserId(req.headers.authorization) })
    .then((subscriptions) => {
      const subscriptionsIds = subscriptions.map(subscription => subscription.followedId);
      Quote.find({ userId: { $in: subscriptionsIds } })
        .sort("-modifiedDate")
        .then((quotes) => res.status(200).json(quotes))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(400).json({ error }));
};

// POST
exports.createQuote = (req, res, next) => {
  delete req.body._id;
  const quote = new Quote({ text: req.body.text, userId: getUserId(req.headers.authorization) });
  quote
    .save()
    .then(() =>
      res.status(201).json({ message: "Quote is created !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// PUT
exports.updateQuote = (req, res, next) => {
  Quote.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, modifiedDate: Date.now() })
    .then(() =>
      res
        .status(200)
        .json({ message: `this quote has been modified !` })
    )
    .catch((error) => res.status(400).json({ error }));
};

// DELETE
exports.deleteQuote = (req, res, next) => {
  Quote.deleteOne({ _id: req.params.id })
    .then(() =>
      res
        .status(200)
        .json({ message: `this quote has been deleted !` }))
    .catch((error) => res.status(400).json({ error }));
};

getUserId = (authorization) => {
  const token = authorization.split(" ");
  return jwt.decode(token[1]).userId
}
