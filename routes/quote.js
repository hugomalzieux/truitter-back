const express = require("express");

const router = express.Router();

const quoteCtrl = require("../controllers/quote");
const auth = require("../middleware/auth");
// --------------------------------------------------
//                     QUOTES
// --------------------------------------------------

// GET
router.get("/:id", auth, quoteCtrl.getAllQuotesFromUser);

// POST
router.post("/", auth, quoteCtrl.createQuote);

// PUT
router.put("/:id", auth, quoteCtrl.updateQuote);

// DELETE
router.delete("/:id", auth, quoteCtrl.deleteQuote);

module.exports = router;
