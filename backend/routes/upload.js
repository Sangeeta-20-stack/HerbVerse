const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

// Upload single file (image or GLB)
router.post("/", protect, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    fileUrl: `/uploads/${req.file.mimetype.startsWith("image/") ? "images" : "models"}/${req.file.filename}`
  });
});

module.exports = router;
