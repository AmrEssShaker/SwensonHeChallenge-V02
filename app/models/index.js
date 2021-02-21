"use strict";

const mongoose = require("mongoose");
const config = require("../../config");

// Connect to database
mongoose.connect(config.database.url, config.database.options).then(() => {
  console.log("connected to database.");
});

module.exports = {
  CoffeProductModel: require("./coffe-product-model"),
};
