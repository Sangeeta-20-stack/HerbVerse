import { useEffect, useState } from "react";
import axios from "axios";
import { FaLeaf, FaGlobe, FaEdit } from "react-icons/fa";

const BASE_URL = "http://localhost:5000";

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [plants, setPlants] = useState([]); // all plants for dropdown
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
        {
          title: form.title,
          theme: form.theme,
          plantIds: form.plantIds,
          duration: Number(form.duration),
        },
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
        {
          title: form.title,
          theme: form.theme,
          plantIds: form.plantIds,
          duration: Number(form.duration),
        },
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

  // toggle plant selection
  const togglePlant = (id) => {
    setForm((prev) => ({
      ...prev,
      plantIds: prev.plantIds.includes(id)
        ? prev.plantIds.filter((pid) => pid !== id)
        : [...prev.plantIds, id],
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-green-900 text-center mb-8 animate-fadeIn">
        Manage Virtual Tours
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* CREATE / EDIT TOUR CARD */}
      <div className="bg-gradient-to-r from-green-200 to-green-400 shadow-2xl rounded-3xl p-6 mb-10 transform hover:-translate-y-1 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-green-900 flex items-center gap-2 mb-4">
          <FaGlobe /> {editingTour ? "Edit Tour" : "Create New Tour"}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            placeholder="Theme (Immunity, Digestive...)"
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            placeholder="Duration (seconds per plant)"
            type="number"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        {/* Plant multi-select dropdown */}
        <div className="mt-4">
          <p className="text-green-900 font-semibold mb-2">Select Plants:</p>
          <div className="flex flex-wrap gap-2">
            {plants.map((plant) => (
              <div
                key={plant._id}
                onClick={() => togglePlant(plant._id)}
                className={`cursor-pointer px-3 py-1 rounded-full border transition-all duration-200 ${
                  form.plantIds.includes(plant._id)
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-green-900 border-green-700"
                }`}
              >
                {plant.name}
              </div>
            ))}
          </div>
        </div>

        {editingTour ? (
          <div className="flex gap-2 mt-4">
            <button
              onClick={updateTour}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
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
          </div>
        ) : (
          <button
            onClick={createTour}
            className="mt-4 bg-green-900 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
          >
            Create Tour
          </button>
        )}
      </div>

      {/* TOURS LIST WITH MINI PREVIEW */}
      <div className="grid md:grid-cols-2 gap-6">
        {tours.length === 0 ? (
          <p className="text-gray-500 col-span-2 text-center">No tours created yet</p>
        ) : (
          tours.map((t) => (
            <div
              key={t._id}
              className="bg-gradient-to-r from-green-300 to-green-500 text-white rounded-3xl p-6 shadow-2xl flex flex-col justify-between transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaLeaf className="text-3xl" />
                <div>
                  <h3 className="text-xl font-bold">{t.title}</h3>
                  <p className="text-sm opacity-90">{t.theme}</p>
                </div>
              </div>

              {/* Mini Preview of Plants */}
              <div className="flex gap-2 mb-4">
                {t.plantIds?.slice(0, 3).map((plant) => (
                  <div
                    key={plant._id}
                    className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white flex items-center justify-center bg-white hover:scale-110 transition-transform duration-300"
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
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-white text-green-900 font-bold text-sm border-2 border-white">
                    +{t.plantIds.length - 3}
                  </div>
                )}
              </div>

              <p className="text-sm mb-4">
                Plants: {t.plantIds?.length || 0} | Duration: {t.duration}s
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(t)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => deleteTour(t._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
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
