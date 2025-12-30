const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) cb(null, "uploads/images");
    else if (file.mimetype === "model/gltf-binary") cb(null, "uploads/models");
    else cb(new Error("Invalid file type"), null);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype === "model/gltf-binary") {
    cb(null, true);
  } else {
    cb(new Error("Only images and GLB models are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
