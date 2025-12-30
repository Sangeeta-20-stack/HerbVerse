const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    botanicalName: { type: String },
    commonNames: [String],
    family: { type: String },
    habitat: { type: String },
    region: [String],
    medicinalUses: [String],
    preparationMethods: [String],
    dosage: String,
    precautions: String,
    cultivation: {
      soil: String,
      climate: String,
      watering: String,
    },
    shortDescription: String, // for listing page
    images: [String], // array of image URLs
    modelUrl: String, // GLB/GLTF model
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", plantSchema);
