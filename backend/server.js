const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs"); // needed for folder creation
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ================= Auto-create uploads folders =================
const folders = ["uploads/images", "uploads/models"];
folders.forEach((folder) => {
  const dir = path.join(__dirname, folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ================= Middleware =================
app.use(cors());
app.use(express.json()); // parse JSON body

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= Import routes & middleware =================
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const uploadRoute = require("./routes/upload");
const adminRoutes = require("./routes/adminRoutes");
const tourRoutes = require("./routes/tourRoutes");
const protect = require("./middleware/authMiddleware");
const adminOnly = require("./middleware/roleMiddleware");

// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/tours", tourRoutes); // <-- Added VirtualTour routes

// ================= Test protected routes =================
app.get("/api/test/protect", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/api/test/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Admin route accessed",
    user: req.user,
  });
});

// ================= Default route =================
app.get("/", (req, res) => res.send("Herb-Verse API running"));

// ================= Start server =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
