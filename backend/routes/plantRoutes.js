const express = require("express");
const Plant = require("../models/Plant");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

// GET all plants - accessible by guest/user/admin
router.get("/", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single plant by ID
router.get("/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Add new plant (Admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const plant = new Plant({ ...req.body, createdBy: req.user.id });
    await plant.save();
    res.status(201).json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update plant (Admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete plant (Admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json({ message: "Plant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
