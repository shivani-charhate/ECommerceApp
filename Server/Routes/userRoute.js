import express from "express";

import {
  registerController,
  loginController,
  forgotPasswordController,
  testController,
} from "../Controller/userController.js";
import { isAdmin, signIn } from "../middlware/authMiddlware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
// test
router.get("/test", signIn, isAdmin, testController);
// dashbord
router.get("/user-auth", signIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.post("/forgot-password", forgotPasswordController);

export default router;
