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
    <div className="space-y-8 px-4 md:px-0 max-w-6xl mx-auto">

      {/* Plant Form */}
      <PlantForm
        plant={editingPlant}
        onSuccess={() => { setEditingPlant(null); fetchPlants(); }}
      />

      {/* Plant Table */}
      <div className="overflow-x-auto rounded-2xl shadow-xl">
        <table className="min-w-full bg-white rounded-2xl overflow-hidden">
          <thead className="bg-gradient-to-r from-mintGreen to-oliveAccent text-white">
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
                    className="bg-yellow-500 text-white px-4 py-1 rounded-xl hover:bg-yellow-400 shadow hover:shadow-lg transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-xl hover:bg-red-400 shadow hover:shadow-lg transition-all"
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
