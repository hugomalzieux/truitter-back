const Quote = require("../models/quote");
const subscriptionCtrl = require("./subscription");
const Subscription = require("../models/subscription");

// --------------------------------------------------
//                     QUOTES
// --------------------------------------------------

// GET ALL
exports.getAllQuotesFromUser = (req, res, next) => {
  Quote.find({ userId: req.params.id })
    .then((quotes) => res.status(200).json(quotes))
    .catch((error) => res.status(400).json({ error }));
};

// POST
exports.createQuote = (req, res, next) => {
  delete req.body._id;
  const quote = new Quote({
    ...req.body, creadtedDate: new Date(), modifiedDate: new Date()
  });

  quote
    .save()
    .then(() =>
      res.status(201).json({ message: "Quote is created !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// PUT
exports.updateQuote = (req, res, next) => {
  Quote.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, modifiedDate: new Date() })
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
