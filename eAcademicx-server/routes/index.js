import express from "express";
import userRouter from "./userRouter.js";
// import authRouter from "./authRouter.js";
import noticeRouter from "./noticeRouter.js";

const router = express.Router();

router.use("/users", userRouter);
// router.use("/users", authRouter);
router.use("/notices", noticeRouter);

export default router;
