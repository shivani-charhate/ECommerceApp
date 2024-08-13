import express from "express";
import { isAdmin, signIn } from "../middlware/authMiddlware.js";
import {
  createProductController,
  allProductsController,
  singleProductController,
  productPhotoController,
  deleteProductController,
} from "../Controller/productController.js";
import Formidable from "express-formidable";
const router = express.Router();

router.post("/add", signIn, isAdmin, Formidable(), createProductController);
router.get("/all", allProductsController);
router.get("/single/:slug", singleProductController);
// get product photo
router.get("/photo/:pid", productPhotoController);
router.delete("/remove/:id", signIn, deleteProductController);

export default router;
