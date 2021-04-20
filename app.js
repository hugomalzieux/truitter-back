const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const quoteRoutes = require("./routes/quote");
const userRoutes = require("./routes/user");
const subscriptionRoutes = require("./routes/subscription");

mongoose
  .connect(
    "mongodb+srv://admin:GVQ6Ru6GQkF3u37@cluster0.bidex.mongodb.net/test?retryWrites=true&w=majority",
    { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("Connection to MongoDB successfull!"))
  .catch(() => console.log("Connection to MongoDB fail !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/quotes", quoteRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
