import express from "express";

import {
  registerController,
  loginController,
  testController,
} from "../Controller/userController.js";
import { isAdmin, signIn } from "../middlware/authMiddlware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
// test
router.get("/test", signIn, isAdmin, testController);

export default router;
