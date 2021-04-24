import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { checkUserAuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/register").post(registerUser);
router
  .route("/profile")
  .get(checkUserAuthMiddleware, getUserProfile)
  .put(checkUserAuthMiddleware, updateUserProfile);

export default router;
