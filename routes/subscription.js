const express = require("express");

const router = express.Router();

const subscriptionCtrl = require("../controllers/subscription");
const auth = require("../middleware/auth");

// --------------------------------------------------
//                     SUBSCRIPTIONS
// --------------------------------------------------

//GET
router.get("/:id", auth, subscriptionCtrl.getQuotesFromUser);

// POST
router.post("/", auth, subscriptionCtrl.subscribe);

// DELETE
router.delete("/", auth, subscriptionCtrl.unsubscribe);

module.exports = router;
