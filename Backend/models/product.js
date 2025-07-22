import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true }, // ✅ made it a string
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: [String], required: true }, // ✅ array of strings
    category: { type: [String], required: true }, // ✅ array of strings
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.models.product || mongoose.model("product", productSchema);
export default Product;
