import express from "express";
import { registerStudent, loginController } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginController);

export default router;
