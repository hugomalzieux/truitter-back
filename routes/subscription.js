const express = require("express");

const router = express.Router();

const subscriptionCtrl = require("../controllers/subscription");
const auth = require("../middleware/auth");

// --------------------------------------------------
//                     SUBSCRIPTIONS
// --------------------------------------------------

// POST
router.post("/:id", auth, subscriptionCtrl.subscribe);

// DELETE
router.delete("/:id", auth, subscriptionCtrl.unsubscribe);

module.exports = router;
