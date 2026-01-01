import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTours } from "../services/tourApi";

const VirtualTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await getAllTours();
        setTours(res.data.tours || res.data || []);
      } catch (err) {
        setError("Failed to load virtual tours");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading)
    return (
      <p className="p-6 text-center text-green-900 font-medium">
        Loading tours...
      </p>
    );

  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-medium">
        {error}
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-center">
        <span className="text-[#8B6D5C]/80">Explore Nature's </span>
        <span className="text-[#A3C4A6]">Wonders</span>
      </h2>

      <p className="text-center text-[#8B6D5C]/80 mb-12 text-lg md:text-xl">
        Discover amazing plants and immersive 3D experiences
      </p>

      {tours.length === 0 && (
        <p className="text-gray-500 text-center text-lg">
          No tours available
        </p>
      )}

      {/* Tour Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((t) => (
          <div
            key={t._id}
            className="
              relative bg-white/70 backdrop-blur-md
              rounded-2xl border border-[#6B8E23]/40
              p-6 flex flex-col justify-between
              shadow-md hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* Tour Info */}
            <div>
              <h2 className="text-2xl font-semibold text-[#556B2F] mb-2">
                {t.title}
              </h2>

              <p className="text-[#8B6D5C] mb-1 font-medium">
                Theme: {t.theme}
              </p>

              <p className="text-[#556B2F] text-sm">
                {t.plantIds?.length || 0} plants
              </p>
            </div>

            {/* Start Tour Button */}
            <Link
              to={`/tours/${t._id}`}
              className="
                mt-5 inline-block text-center
                px-6 py-2.5 rounded-full
                font-semibold tracking-wide
                bg-[#6B8E23] text-[#F9F8F3]
                hover:bg-transparent hover:text-[#6B8E23]
                border border-[#6B8E23]
                transition-all duration-300
              "
            >
              Start Your Adventure →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualTours;
