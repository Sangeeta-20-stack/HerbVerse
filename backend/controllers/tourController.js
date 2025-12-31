const VirtualTour = require("../models/VirtualTour");

// ================= GET ALL TOURS =================
exports.getTours = async (req, res) => {
  try {
    const { theme } = req.query;
    const query = theme ? { theme } : {};

    const tours = await VirtualTour.find(query).populate("plantIds");
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET SINGLE TOUR =================
exports.getTourById = async (req, res) => {
  try {
    const tour = await VirtualTour.findById(req.params.id).populate("plantIds");
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE TOUR (ADMIN) =================
exports.createTour = async (req, res) => {
  try {
    const { title, theme, plantIds, duration } = req.body;

    if (!title || !theme || !plantIds?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const tour = new VirtualTour({
      title,
      theme,
      plantIds,
      duration,
      createdBy: req.user._id,
    });

    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE TOUR (ADMIN) =================
exports.updateTour = async (req, res) => {
  try {
    const tour = await VirtualTour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE TOUR (ADMIN) =================
exports.deleteTour = async (req, res) => {
  try {
    const tour = await VirtualTour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
