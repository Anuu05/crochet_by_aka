import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";
import Product from "../models/Product.js"; // <-- Add this import

const productRouter = express.Router();

productRouter.post("/add", upload.array("images"), authSeller, addProduct);
productRouter.get("/list", productList);
productRouter.get("/id/:id", productById);
productRouter.post("/stock", authSeller, changeStock);

// ✅ Add this new route
productRouter.put("/update/:id", authSeller, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default productRouter;
