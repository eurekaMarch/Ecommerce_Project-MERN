import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true, default: 0 },
  description: { type: String, require: true },
  category: { type: String, require: true },
  image: { type: String, require: true },
  rating: { type: Object, require: true },
  stock: { type: Number, require: true, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
