import express from "express";
import { upload } from "../configs/multer.js"; // ✅ correct named import
import authSeller from "../middleware/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Add Product
productRouter.post("/add", upload.array("images"), authSeller, addProduct);

// Get all products
productRouter.get("/list", productList);

// Get product by ID using URL param
productRouter.get("/id/:id", productById);

// Update stock status
productRouter.post("/stock", authSeller, changeStock);

export default productRouter;
