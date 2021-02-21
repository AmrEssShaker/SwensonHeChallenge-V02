const { CoffeProductModel } = require("../../models");
const { generalHalper } = require("../../helpers");
const customResponse = require('../../middleware/custom-reponse');

module.exports.createCoffeProduct = async (event) => {
  const data = JSON.parse(event.body);

  // Generate ske
  data.sku = await generalHalper.generateSKU(
    data.product_type,
    data.coffee_flavor,
    data.pack_size
  );

  const sku_exists = await CoffeProductModel.getBySKU(data.sku);
  if (sku_exists) {
    return customResponse.sendFailure('Product already exists!')
  }

  // Store coffee product in db
  const coffeProduct = await CoffeProductModel.createCoffeeProduct(data);
  return customResponse.sendSuccess(coffeProduct);
};
