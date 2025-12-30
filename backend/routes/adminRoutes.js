const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");

// Plant routes
router.post("/plants", protect, adminOnly, adminController.addPlant);
router.get("/plants", protect, adminOnly, adminController.getAllPlants);
router.get("/plants/:id", protect, adminOnly, adminController.getPlantById);
router.put("/plants/:id", protect, adminOnly, adminController.updatePlant);
router.delete("/plants/:id", protect, adminOnly, adminController.deletePlant);

// User routes
router.get("/users", protect, adminOnly, adminController.getAllUsers);
router.put("/users/:id", protect, adminOnly, adminController.updateUserRole);
router.delete("/users/:id", protect, adminOnly, adminController.deleteUser);

module.exports = router;
