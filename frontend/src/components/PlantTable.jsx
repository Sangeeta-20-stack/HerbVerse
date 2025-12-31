import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import PlantForm from "./PlantForm";

const PlantTable = () => {
  const [plants, setPlants] = useState([]);
  const [editingPlant, setEditingPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/plants");
      setPlants(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to fetch plants. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axiosInstance.delete(`/admin/plants/${id}`);
        fetchPlants();
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Failed to delete plant.");
      }
    }
  };

  if (loading)
    return <p className="text-gray-700 text-center mt-6">Loading plants...</p>;

  return (
    <div className="space-y-12 px-4 md:px-0 max-w-8xl mx-auto">

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#556B2F]">
          Manage <span className="text-[#A3C4A6]">Plants</span>
        </h1>
        <p className="mt-4 text-[#8B6D5C]/75 max-w-3xl mx-auto">
          Add, edit, or delete medicinal plants with all relevant details including images, 3D models, and cultivation information.
        </p>
      </header>

      {/* Plant Form */}
      <PlantForm
        plant={editingPlant}
        onSuccess={() => { setEditingPlant(null); fetchPlants(); }}
      />

      {/* Plant Table */}
      <div className="overflow-x-auto rounded-3xl shadow-xl border border-green-200">
        <table className="min-w-[900px] w-full bg-white rounded-3xl overflow-hidden">
          <thead className="bg-gradient-to-r from-[#4B6B2F] to-[#91B794] text-white">
            <tr>
              <th className="p-4 text-left font-semibold tracking-wide">Name</th>
              <th className="p-4 text-left font-semibold tracking-wide">Botanical Name</th>
              <th className="p-4 text-left font-semibold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No plants found
                </td>
              </tr>
            )}
            {plants.map((p, idx) => (
              <tr
                key={p._id}
                className={`transition-all duration-300 ${
                  idx % 2 === 0 ? "bg-green-50" : "bg-green-100"
                } hover:bg-green-200`}
              >
                <td className="p-4 font-medium text-green-800">{p.name}</td>
                <td className="p-4 text-green-700">{p.botanicalName}</td>
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => setEditingPlant(p)}
                    className="bg-gradient-to-r from-[#A3C4A6] to-[#556B2F] text-white px-5 py-2 rounded-xl shadow hover:shadow-lg transition-all hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-xl shadow hover:shadow-lg transition-all hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlantTable;
