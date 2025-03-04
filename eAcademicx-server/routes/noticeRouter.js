import express from "express";
import {
  getAllNotices,
  getNoticeCount,
  addNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

router.get("/", getAllNotices);
router.get("/count", getNoticeCount);
router.post("/add", addNotice);

export default router;
