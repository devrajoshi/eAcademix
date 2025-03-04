import express from "express";
import {
  getAllUsers,
  getUserCount,
  getUserByRole,
  registerController,
  deleteUser,
  loginController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/count", getUserCount);
router.get("/role", getUserByRole);
router.post("/register", registerController);
router.delete("/delete/:id", deleteUser);
router.post("/login", loginController);

export default router;
