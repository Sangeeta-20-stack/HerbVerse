import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const PlantForm = ({ plant, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    botanicalName: "",
    commonNames: "",
    family: "",
    habitat: "",
    region: "",
    medicinalUses: "",
    preparationMethods: "",
    dosage: "",
    precautions: "",
    cultivationSoil: "",
    cultivationClimate: "",
    cultivationWatering: "",
    shortDescription: "",
    images: "",
    modelUrl: "",
  });

  useEffect(() => {
    if (plant) {
      setFormData({
        name: plant.name || "",
        botanicalName: plant.botanicalName || "",
        commonNames: plant.commonNames?.join(", ") || "",
        family: plant.family || "",
        habitat: plant.habitat || "",
        region: plant.region?.join(", ") || "",
        medicinalUses: plant.medicinalUses?.join(", ") || "",
        preparationMethods: plant.preparationMethods?.join(", ") || "",
        dosage: plant.dosage || "",
        precautions: plant.precautions || "",
        cultivationSoil: plant.cultivation?.soil || "",
        cultivationClimate: plant.cultivation?.climate || "",
        cultivationWatering: plant.cultivation?.watering || "",
        shortDescription: plant.shortDescription || "",
        images: plant.images?.join(", ") || "",
        modelUrl: plant.modelUrl || "",
      });
    }
  }, [plant]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        commonNames: formData.commonNames.split(",").map((s) => s.trim()),
        region: formData.region.split(",").map((s) => s.trim()),
        medicinalUses: formData.medicinalUses.split(",").map((s) => s.trim()),
        preparationMethods: formData.preparationMethods.split(",").map((s) => s.trim()),
        images: formData.images.split(",").map((s) => s.trim()),
        cultivation: {
          soil: formData.cultivationSoil,
          climate: formData.cultivationClimate,
          watering: formData.cultivationWatering,
        },
      };

      if (plant) {
        await axiosInstance.put(`/admin/plants/${plant._id}`, payload);
      } else {
        await axiosInstance.post("/admin/plants", payload);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F3]/95 py-10 font-inter">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#556B2F]">
          {plant ? "Edit" : "Add"} <span className="text-[#A3C4A6]">Plant</span>
        </h1>
        <p className="mt-4 text-[#8B6D5C]/75 max-w-2xl mx-auto">
          Fill in all plant details including botanical information, images, and 3D models.
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl space-y-6 max-w-4xl mx-auto transition-all"
      >
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "name", placeholder: "Name", required: true },
            { name: "botanicalName", placeholder: "Botanical Name" },
            { name: "commonNames", placeholder: "Common Names (comma separated)" },
            { name: "family", placeholder: "Family" },
            { name: "habitat", placeholder: "Habitat" },
            { name: "region", placeholder: "Region (comma separated)" },
            { name: "medicinalUses", placeholder: "Medicinal Uses (comma separated)" },
            { name: "preparationMethods", placeholder: "Preparation Methods (comma separated)" },
            { name: "dosage", placeholder: "Dosage" },
            { name: "precautions", placeholder: "Precautions" },
            { name: "cultivationSoil", placeholder: "Cultivation - Soil" },
            { name: "cultivationClimate", placeholder: "Cultivation - Climate" },
            { name: "cultivationWatering", placeholder: "Cultivation - Watering" },
            { name: "shortDescription", placeholder: "Short Description" },
            { name: "images", placeholder: "Image URLs (comma separated)" },
            { name: "modelUrl", placeholder: "3D Model URL (GLB/GLTF)" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required || false}
              className="w-full p-3 rounded-xl border border-[#A3C4A6]/40 focus:outline-none focus:ring-2 focus:ring-[#556B2F] placeholder-gray-500 transition-all bg-[#F9F8F3]/90 text-[#556B2F]"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#556B2F] to-[#A3C4A6] hover:scale-105 hover:shadow-lg hover:shadow-[#A3C4A6]/30 transition-all duration-300"
        >
          {plant ? "Update Plant" : "Add Plant"}
        </button>
      </form>
    </div>
  );
};

export default PlantForm;
