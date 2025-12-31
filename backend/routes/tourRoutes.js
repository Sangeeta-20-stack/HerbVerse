const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

// ================= USER ROUTES =================
router.get("/", protect, getTours);
router.get("/:id", protect, getTourById);

// ================= ADMIN ROUTES =================
router.post("/", protect, adminOnly, createTour);
router.put("/:id", protect, adminOnly, updateTour);
router.delete("/:id", protect, adminOnly, deleteTour);

module.exports = router;
