// src/pages/Plants.jsx
import React, { useEffect, useState } from "react";
import PlantCard from "../components/PlantCard";
import { FaSearch, FaLeaf, FaGlobe } from "react-icons/fa";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUse, setFilterUse] = useState("");
  const [filterHabitat, setFilterHabitat] = useState("");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view plants.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/plants", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to fetch plants");
        }

        const data = await res.json();
        setPlants(data);
        setFilteredPlants(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // Filter & Search
  useEffect(() => {
    let tempPlants = [...plants];

    if (searchTerm) {
      tempPlants = tempPlants.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.botanicalName &&
            p.botanicalName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.commonNames &&
            p.commonNames.some((cn) =>
              cn.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    if (filterUse) {
      tempPlants = tempPlants.filter(
        (p) =>
          p.medicinalUses &&
          p.medicinalUses.some((use) =>
            use.toLowerCase().includes(filterUse.toLowerCase())
          )
      );
    }

    if (filterHabitat) {
      tempPlants = tempPlants.filter(
        (p) =>
          p.habitat &&
          p.habitat.toLowerCase().includes(filterHabitat.toLowerCase())
      );
    }

    setFilteredPlants(tempPlants);
  }, [searchTerm, filterUse, filterHabitat, plants]);

  return (
    <div className="min-h-screen relative font-inter py-12 px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1f1a] via-[#082419] to-[#0f2c1d] -z-10" />

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-mintGreen">
          Nature’s <span className="text-oliveAccent">Healing</span>
        </h1>
        <p className="mt-4 text-softWhite/75 max-w-2xl mx-auto">
          Explore medicinal plants with images, 3D models, and detailed information.
        </p>
      </header>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <div className="relative w-full sm:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-mintGreen"
          />
        </div>

        <div className="relative w-full sm:w-1/3">
          <FaLeaf className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
          <input
            type="text"
            placeholder="Filter by medicinal use..."
            value={filterUse}
            onChange={(e) => setFilterUse(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="relative w-full sm:w-1/3">
          <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
          <input
            type="text"
            placeholder="Filter by habitat..."
            value={filterHabitat}
            onChange={(e) => setFilterHabitat(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Plants Grid */}
      {loading ? (
        <p className="text-center text-white text-lg">Loading plants...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : filteredPlants.length === 0 ? (
        <p className="text-center text-white text-lg">No plants found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant._id} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Plants;
