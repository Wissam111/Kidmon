const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: { type: String },
  category: { type: String },
  allergicIngredients: { type: [String] },
  title: { type: String },
  price: { type: String },
  image: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

productSchema.index({ title: 1, category: 1 }, { unique: true });

const Product = mongoose.model("product", productSchema);
module.exports = Product;
