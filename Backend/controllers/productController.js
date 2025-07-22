import { cloudinary } from "../configs/cloudinary.js";
import Product from "../models/product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Product List
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Product List Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Product by ID
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("Product By ID Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Product inStock Status
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    if (!id || typeof inStock === "undefined") {
      return res.status(400).json({ success: false, message: "Product ID and inStock status are required" });
    }
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.error("Change Stock Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
