const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const config = require("../../config");

const CoffeeProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      unique: true,
    },
    product_type: String,
    water_line_compatible: Boolean,
    coffee_flavor: String,
    pack_size: Number,
  },
  { timestamps: { CreatedAt: "created_at" } }
);

CoffeeProductSchema.plugin(mongooseLeanVirtuals);

// Ensure virtual fields are serialized
CoffeeProductSchema.set("toJSON", {
  virtuals: true,
});

CoffeeProductSchema.set("toObject", {
  virtuals: true,
});

const CoffeeProduct = mongoose.model(
  "Coffee Products",
  CoffeeProductSchema,
  "coffee_products"
);

module.exports = {
  async createCoffeeProduct(data) {
    const coffeeProduct = new CoffeeProduct(data);
    const returnedCoffeeProduct = await coffeeProduct.save();
    return returnedCoffeeProduct.toObject();
  },

  async all(srchObj) {
    const query = {};

    if (srchObj.product_type) {
      query.product_type = srchObj.product_type;
    }

    if (srchObj.water_line_compatible) {
      query.water_line_compatible = srchObj.water_line_compatible;
    }

    if (srchObj.coffee_flavor) {
      query.coffee_flavor = srchObj.coffee_flavor;
    }

    if (srchObj.pack_size) {
      query.pack_size = srchObj.pack_size;
    }

    const total = await CoffeeProduct.find(query)
      .lean({ virtuals: true })
      .countDocuments();
    const page = Number(srchObj.page) || 1;

    if (srchObj.limit === "0") {
      return await CoffeeProduct.find(query).lean({ virtuals: true });
    }

    const limit = Number(srchObj.limit) || config.app.reading.perPage;
    const skip = (page - 1) * limit;
    let to = skip + limit;

    if (to > total) {
      to = total;
    }

    const coffeLines = await CoffeeProduct.find(query).skip(skip).limit(limit);

    return {
      total,
      to,
      curren_page: page,
      per_page: limit,
      data: coffeLines,
    };
  },

  async getByProductType(product_type) {
    return CoffeeProduct.find({ product_type })
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });
  },

  async getBySKU(sku) {
    let exists = false;
    const product = await CoffeeProduct.findOne({ sku });
    if (product) {
      exists = true;
    }
    return exists;
  },
};
