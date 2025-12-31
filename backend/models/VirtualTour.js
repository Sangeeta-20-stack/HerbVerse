const mongoose = require("mongoose");

const VirtualTourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true, // e.g. Digestive Health, Immunity Boost
    },
    plantIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
        required: true,
      },
    ],
    duration: {
      type: Number,
      default: 5, // seconds per plant
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VirtualTour", VirtualTourSchema);
