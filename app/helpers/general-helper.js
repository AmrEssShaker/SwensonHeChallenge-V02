const { CoffeProductModel } = require("../models");

module.exports = {
  async generateSKU(product_type, coffee_flavor, pack_size) {
    let skuPrefix = "";
    let skuSuffix = "01";

    switch (product_type) {
      case "COFFEE_MACHINE_LARGE":
        skuPrefix = "CM1";
        break;
      case "COFFEE_MACHINE_SMALL":
        skuPrefix = "CM0";
        break;
      case "ESPRESSO_MACHINE":
        skuPrefix = "EM0";
        break;
      case "COFFEE_POD_LARGE":
        skuPrefix = "CP1";
        break;
      case "COFFEE_POD_SMALL":
        skuPrefix = "CP0";
        break;
      case "ESPRESSO_POD":
        skuPrefix = "EP0";
    }

    if (
      product_type === "COFFEE_POD_LARGE" ||
      product_type === "COFFEE_POD_SMALL" ||
      product_type === "ESPRESSO_POD"
    ) {
      switch (coffee_flavor) {
        case "COFFEE_FLAVOR_VANILLA":
          skuSuffix = "0";
          break;
        case "COFFEE_FLAVOR_CARAMEL":
          skuSuffix = "1";
          break;
        case "COFFEE_FLAVOR_PSL":
          skuSuffix = "2";
          break;
        case "COFFEE_FLAVOR_MOCHA":
          skuSuffix = "3";
          break;
        case "COFFEE_FLAVOR_HAZELNUT":
          skuSuffix = "4";
      }
      return skuPrefix + skuSuffix + pack_size;
    }

    const exisitingCoffeeProducts = await CoffeProductModel.getByProductType(
      product_type
    );

    if (exisitingCoffeeProducts.length) {
      skuSuffix = Number(exisitingCoffeeProducts[0].sku.slice(3)) + 1;
      if (skuSuffix < 10) {
        skuSuffix = "0" + skuSuffix;
      }
    }

    return skuPrefix + skuSuffix;
  },
};
