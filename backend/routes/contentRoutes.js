import express from "express";
import { uploadContent, getUserUploads, getAllContent } from "../controllers/contentController.js";
import { protect } from "../utils/protect.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  }
});

const upload = multer({ storage });

// Routes
router.post("/upload", protect, upload.single("file"), uploadContent);
router.get("/myuploads", protect, getUserUploads);
router.get("/all", getAllContent); // <-- Add this line

export default router;
