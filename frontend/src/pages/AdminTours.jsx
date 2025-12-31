import { useEffect, useState } from "react";
import axios from "axios";
import { FaLeaf, FaGlobe, FaEdit } from "react-icons/fa";

const BASE_URL = "https://herbverse-backend-xg7z.onrender.com";

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");
  const [editingTour, setEditingTour] = useState(null);
  const [form, setForm] = useState({
    title: "",
    theme: "",
    plantIds: [],
    duration: "",
  });

  const token = localStorage.getItem("token");

  const fetchTours = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tours`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTours(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load tours");
      console.error(err);
    }
  };

  const fetchPlants = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/plants`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlants(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load plants", err);
    }
  };

  useEffect(() => {
    fetchTours();
    fetchPlants();
  }, []);

  const createTour = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/tours`,
        { ...form, duration: Number(form.duration) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ title: "", theme: "", plantIds: [], duration: "" });
      fetchTours();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (tour) => {
    setEditingTour(tour);
    setForm({
      title: tour.title,
      theme: tour.theme,
      plantIds: tour.plantIds.map((p) => p._id),
      duration: tour.duration,
    });
  };

  const updateTour = async () => {
    if (!editingTour) return;
    try {
      await axios.put(
        `${BASE_URL}/api/tours/${editingTour._id}`,
        { ...form, duration: Number(form.duration) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTour(null);
      setForm({ title: "", theme: "", plantIds: [], duration: "" });
      fetchTours();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTour = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTours();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePlant = (id) => {
    setForm((prev) => ({
      ...prev,
      plantIds: prev.plantIds.includes(id)
        ? prev.plantIds.filter((pid) => pid !== id)
        : [...prev.plantIds, id],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef6f1] to-[#d9f0e4] font-inter p-6 md:p-10">

      {/* Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#556B2F]">
          Manage <span className="text-[#A3C4A6]">Virtual Tours</span>
        </h1>
        <p className="mt-4 text-[#8B6D5C]/75 max-w-3xl mx-auto">
          Create, edit, or delete virtual herbal tours. Select plants, assign themes, and set durations for your interactive tours.
        </p>
      </header>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* CREATE / EDIT TOUR CARD */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 mb-10 transform hover:-translate-y-1 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-[#556B2F] flex items-center gap-2 mb-4">
          <FaGlobe /> {editingTour ? "Edit Tour" : "Create New Tour"}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A3C4A6] text-gray-800"
          />
          <input
            placeholder="Theme (Immunity, Digestive...)"
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A3C4A6] text-gray-800"
          />
          <input
            placeholder="Duration (seconds per plant)"
            type="number"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A3C4A6] text-gray-800"
          />
        </div>

        {/* Plant multi-select */}
        <div className="mt-4">
          <p className="text-[#556B2F] font-semibold mb-2">Select Plants:</p>
          <div className="flex flex-wrap gap-2">
            {plants.map((plant) => (
              <div
                key={plant._id}
                onClick={() => togglePlant(plant._id)}
                className={`cursor-pointer px-3 py-1 rounded-full border transition-all duration-200 ${
                  form.plantIds.includes(plant._id)
                    ? "bg-[#556B2F] text-white border-[#556B2F]"
                    : "bg-white text-[#556B2F] border-[#556B2F]"
                }`}
              >
                {plant.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          {editingTour ? (
            <>
              <button
                onClick={updateTour}
                className="bg-[#556B2F] hover:bg-[#A3C4A6] text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
              >
                Update Tour
              </button>
              <button
                onClick={() => {
                  setEditingTour(null);
                  setForm({ title: "", theme: "", plantIds: [], duration: "" });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={createTour}
              className="bg-[#556B2F] hover:bg-[#A3C4A6] text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
            >
              Create Tour
            </button>
          )}
        </div>
      </div>

      {/* Tours Table-style List */}
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white p-4">
        <table className="min-w-full divide-y divide-green-200">
          <thead className="bg-gradient-to-r from-[#A3C4A6] to-[#556B2F] text-white">
            <tr>
              <th className="p-4 text-left font-semibold">Title</th>
              <th className="p-4 text-left font-semibold">Theme</th>
              <th className="p-4 text-left font-semibold">Plants</th>
              <th className="p-4 text-left font-semibold">Duration</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {tours.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No tours created yet
                </td>
              </tr>
            ) : (
              tours.map((t, idx) => (
                <tr
                  key={t._id}
                  className={`transition-all duration-300 transform hover:scale-101 ${
                    idx % 2 === 0 ? "bg-green-50" : "bg-green-100"
                  }`}
                >
                  <td className="p-4 font-medium text-green-900">{t.title}</td>
                  <td className="p-4 text-green-800">{t.theme}</td>
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {t.plantIds?.slice(0, 3).map((plant) => (
                        <div
                          key={plant._id}
                          className="w-12 h-12 rounded-lg overflow-hidden border-2 border-green-700 flex items-center justify-center bg-white"
                        >
                          {plant.images && plant.images[0] ? (
                            <img
                              src={`${BASE_URL}${plant.images[0]}`}
                              alt={plant.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-green-700 text-xs text-center px-1">
                              {plant.name}
                            </span>
                          )}
                        </div>
                      ))}
                      {t.plantIds.length > 3 && (
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white text-green-900 font-bold text-xs border-2 border-green-700">
                          +{t.plantIds.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-green-900 font-medium">{t.duration}s</td>
                  <td className="p-4 flex gap-2">
  <button
    onClick={() => startEditing(t)}
    className="bg-green-200 hover:bg-green-300 text-green-900 px-4 py-2 rounded-xl shadow-md flex items-center gap-1"
  >
    <FaEdit /> Edit
  </button>
  <button
    onClick={() => deleteTour(t._id)}
    className="bg-red-200 hover:bg-red-300 text-red-900 px-4 py-2 rounded-xl shadow-md"
  >
    Delete
  </button>
</td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default AdminTours;

