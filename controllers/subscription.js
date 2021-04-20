const Quote = require("../models/quote");
const Subscription = require("../models/subscription");

// --------------------------------------------------
//                     SUBSCRIPTIONS
// --------------------------------------------------

//TODO !!!!
exports.getQuotesFromUser = (req, res, next) => {
  Subscription.find({ followedId: req.params.id })
    .then((subscriptions) => {
      Quote.find({ userId: [] })
        .then((quotes) => res.status(200).json(quotes))
        .catch((error) => res.status(400).json({ error }))
      res.status(200).json(subscription)
    })
    .catch((error) => res.status(400).json({ error }));
};

// POST
exports.subscribe = (req, res, next) => {
  delete req.body._id;
  const subscription = new Subscription({
    ...req.body,
  });
  subscription
    .save()
    .then(() =>
      res.status(201).json({ message: "You follow this account" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// DELETE
exports.unsubscribe = (req, res, next) => {
  Subscription.deleteOne({ followerId: req.body.followerId, followedId: req.body.followedId })
    .then(() =>
      res
        .status(200)
        .json({ message: `You've unfollow this account!` })
    )
    .catch((error) => res.status(400).json({ error }));
};
