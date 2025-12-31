const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect  = require("../middleware/authMiddleware"); // JWT auth middleware

const router = express.Router();

// Generate JWT
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role: role || "user" });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ================= BOOKMARKS ================= */

// Add bookmark
router.post("/bookmark/:plantId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.bookmarks) user.bookmarks = [];

    if (!user.bookmarks.includes(req.params.plantId)) {
      user.bookmarks.push(req.params.plantId);
      await user.save();
    }
    res.json({ message: "Plant bookmarked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove bookmark
router.delete("/bookmark/:plantId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.bookmarks) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== req.params.plantId
      );
      await user.save();
    }
    res.json({ message: "Bookmark removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= NOTES ================= */

// Add / Update note
router.post("/note/:plantId", protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Note text is required" });

    const user = await User.findById(req.user.id);
    if (!user.notes) user.notes = [];

    const noteIndex = user.notes.findIndex(
      (n) => n.plant.toString() === req.params.plantId
    );

    if (noteIndex > -1) {
      user.notes[noteIndex].text = text; // Update
    } else {
      user.notes.push({ plant: req.params.plantId, text }); // Add
    }

    await user.save();
    res.json({ message: "Note saved", notes: user.notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete note
router.delete("/note/:plantId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.notes) {
      user.notes = user.notes.filter(
        (n) => n.plant.toString() !== req.params.plantId
      );
      await user.save();
    }
    res.json({ message: "Note deleted", notes: user.notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's bookmarks and notes
router.get("/data", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("bookmarks")
      .populate("notes.plant");
    res.json({ bookmarks: user.bookmarks, notes: user.notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
