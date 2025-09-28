import express from "express";
import formidable from "express-formidable";

const router = express.Router();


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


import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts) // /api/products?keyword=...
  .post(authenticate, authorizeAdmin, formidable(), addProduct); // Add new product


router.get("/allproducts", authenticate, authorizeAdmin, fetchAllProducts);


router.post("/filtered-products", filterProducts);


router.get("/top", fetchTopProducts);


router.get("/new", fetchNewProducts);


router.post("/:id/reviews", authenticate, checkId, addProductReview);


router
  .route("/:id")
  .get(checkId, fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
