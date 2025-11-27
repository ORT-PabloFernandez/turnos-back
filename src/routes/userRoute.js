import express from "express";
import { getAllUsers, getUser, registerUserController, loginUserController, updateUserController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { updateUser } from "../data/userData.js";

const router = express.Router();
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUserController);

export default router;
