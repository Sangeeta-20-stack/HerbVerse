import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const PlantForm = ({ plant, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    botanicalName: "",
    commonNames: "",
    habitat: "",
    medicinalUses: "",
    shortDescription: "",
    images: "",
    modelUrl: "",
  });

  useEffect(() => {
    if (plant) {
      setFormData({
        ...plant,
        commonNames: plant.commonNames?.join(", "),
        medicinalUses: plant.medicinalUses?.join(", "),
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
        medicinalUses: formData.medicinalUses.split(",").map((s) => s.trim()),
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-3xl shadow-2xl space-y-6 max-w-3xl mx-auto transition-all"
    >
      <h2 className="text-2xl font-extrabold text-green-900 border-b-4 border-green-700 pb-2">
        {plant ? "Edit Plant" : "Add New Plant"}
      </h2>

      {[ 
        { name: "name", placeholder: "Name", required: true },
        { name: "botanicalName", placeholder: "Botanical Name" },
        { name: "commonNames", placeholder: "Common Names (comma separated)" },
        { name: "habitat", placeholder: "Habitat" },
        { name: "medicinalUses", placeholder: "Medicinal Uses (comma separated)" },
        { name: "shortDescription", placeholder: "Short Description" },
        { name: "images", placeholder: "Image URL" },
        { name: "modelUrl", placeholder: "3D Model URL" },
      ].map((field) => (
        <input
          key={field.name}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          required={field.required || false}
          className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition-all bg-green-50 text-gray-800"
        />
      ))}

      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-green-900 hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300"
      >
        {plant ? "Update Plant" : "Add Plant"}
      </button>
    </form>
  );
};

export default PlantForm;
