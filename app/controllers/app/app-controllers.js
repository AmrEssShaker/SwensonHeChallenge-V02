const { CoffeProductModel } = require("../../models");
const customResponse = require("../../middleware/custom-reponse");

module.exports.listCoffeeProducts = async (event) => {
  const srchObj = { ...event.queryStringParameters };
  const coffeProducts = await CoffeProductModel.all(srchObj);
  
  return customResponse.sendSuccess(coffeProducts);
};
