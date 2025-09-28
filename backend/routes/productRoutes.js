import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// Controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// @desc    Get products list or search
// @route   GET /api/products
router
  .route("/")
  .get(fetchProducts) // /api/products?keyword=...
  .post(authenticate, authorizeAdmin, formidable(), addProduct); // Add new product

// @desc    Get all products (admin)
// @route   GET /api/products/allproducts
router.get("/allproducts", authenticate, authorizeAdmin, fetchAllProducts);

// @desc    Filtered products (for search/filtering)
// @route   POST /api/products/filtered-products
router.post("/filtered-products", filterProducts);

// @desc    Get top-rated products
// @route   GET /api/products/top
router.get("/top", fetchTopProducts);

// @desc    Get new arrival products
// @route   GET /api/products/new
router.get("/new", fetchNewProducts);

// @desc    Product reviews
// @route   POST /api/products/:id/reviews
router.post("/:id/reviews", authenticate, checkId, addProductReview);

// @desc    Single product (view, update, delete)
// @route   GET /api/products/:id
//          PUT /api/products/:id
//          DELETE /api/products/:id
router
  .route("/:id")
  .get(checkId, fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
