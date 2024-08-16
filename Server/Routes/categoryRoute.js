import express from "express";
import { isAdmin, signIn } from "../middlware/authMiddlware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../Controller/categoryController.js";

const router = express.Router();

router.post("/create", signIn, isAdmin, createCategoryController);
router.put("/update/:id", signIn, updateCategoryController);
router.get("/getAll", categoryController);
router.get("/single/:slug", singleCategoryController);
router.delete("/delete/:id", signIn, isAdmin, deleteCategoryController);
export default router;
