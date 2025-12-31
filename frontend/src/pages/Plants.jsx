import React, { useEffect, useState } from "react";
import PlantCard from "../components/PlantCard";
import { FaSearch, FaLeaf, FaGlobe } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterUse, setFilterUse] = useState("");
  const [filterHabitat, setFilterHabitat] = useState("");
  const [sortOption, setSortOption] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        if (!token) {
          setError("Please login to view plants.");
          toast.error("Please login to view plants.");
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get("/plants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(res.data);
        setFilteredPlants(res.data);

        if (role === "user") {
          const userData = await axiosInstance.get("/auth/data", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBookmarks(userData.data.bookmarks.map((b) => b._id));
          setNotes(userData.data.notes);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [token, role]);

  useEffect(() => {
    let tempPlants = [...plants];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      tempPlants = tempPlants.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.botanicalName && p.botanicalName.toLowerCase().includes(term)) ||
          (p.commonNames && p.commonNames.some((cn) => cn.toLowerCase().includes(term)))
      );
    }

    // Filters
    if (filterUse) {
      tempPlants = tempPlants.filter(
        (p) =>
          p.medicinalUses &&
          p.medicinalUses.some((use) => use.toLowerCase().includes(filterUse.toLowerCase()))
      );
    }

    if (filterHabitat) {
      tempPlants = tempPlants.filter(
        (p) => p.habitat && p.habitat.toLowerCase().includes(filterHabitat.toLowerCase())
      );
    }

    // Sorting
    if (sortOption === "alphabetical") {
      tempPlants.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "medicinal") {
      tempPlants.sort(
        (a, b) => (b.medicinalUses?.length || 0) - (a.medicinalUses?.length || 0)
      );
    }

    setFilteredPlants(tempPlants);
  }, [searchTerm, filterUse, filterHabitat, sortOption, plants]);

  return (
    <div className="min-h-screen relative font-inter py-12 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#F9F8F3] via-[#E3F0E0] to-[#D9E6D3] -z-10" />

      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#556B2F]">
          Nature’s <span className="text-[#A3C4A6]">Healing</span>
        </h1>
        <p className="mt-4 text-[#8B6D5C]/75 max-w-2xl mx-auto">
          Explore medicinal plants with images, 3D models, and detailed information.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-10">
        {/* Search */}
        <div className="relative w-full sm:w-1/4">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556B2F]" />
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-xl shadow-inner bg-[#F9F8F3]/80 text-[#556B2F] focus:outline-none focus:ring-2 focus:ring-[#A3C4A6] transition-all"
          />
        </div>

        {/* Filter by medicinal use */}
        <div className="relative w-full sm:w-1/4">
          <FaLeaf className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3C4A6]" />
          <input
            type="text"
            placeholder="Filter by medicinal use..."
            value={filterUse}
            onChange={(e) => setFilterUse(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-xl shadow-inner bg-[#F9F8F3]/80 text-[#556B2F] focus:outline-none focus:ring-2 focus:ring-[#F5D547] transition-all"
          />
        </div>

        {/* Filter by habitat */}
        <div className="relative w-full sm:w-1/4">
          <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556B2F]" />
          <input
            type="text"
            placeholder="Filter by habitat..."
            value={filterHabitat}
            onChange={(e) => setFilterHabitat(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-xl shadow-inner bg-[#F9F8F3]/80 text-[#556B2F] focus:outline-none focus:ring-2 focus:ring-[#A3C4A6] transition-all"
          />
        </div>

        {/* Sort By dropdown */}
        <div className="relative w-full sm:w-1/4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none w-full pl-4 pr-10 py-3 rounded-xl bg-gradient-to-r from-[#F9F8F3]/90 via-[#E3F0E0]/90 to-[#D9E6D3]/90 text-[#556B2F] font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#F5D547] hover:scale-105 transition-transform duration-300"
          >
            <option value="">Sort By</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="medicinal">Medicinal Importance</option>
          </select>
          {/* Custom Arrow */}
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#556B2F]">
            ▼
          </div>
        </div>
      </div>

      {/* Plants Grid */}
      {loading ? (
        <p className="text-center text-[#556B2F] text-lg">Loading plants...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : filteredPlants.length === 0 ? (
        <p className="text-center text-[#556B2F] text-lg">No plants found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPlants.map((plant) => {
            const bookmarked = bookmarks.includes(plant._id);
            const noteObj = notes.find((n) => n.plant._id === plant._id);
            return (
              <PlantCard
                key={plant._id}
                plant={plant}
                role={role}
                bookmarked={bookmarked}
                note={noteObj?.text}
                toast={toast}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Plants;
