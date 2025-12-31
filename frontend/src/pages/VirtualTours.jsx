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

  if (loading) return <p className="p-6 text-center">Loading tours...</p>;
  if (error) return <p className="p-6 text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-green-800 text-center"> Virtual Tours</h1>

      {tours.length === 0 && (
        <p className="text-gray-500 text-center">No tours available</p>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((t) => (
          <div
            key={t._id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            {/* Tour Header */}
            <div>
              <h2 className="text-2xl font-semibold text-green-900 mb-2">{t.title}</h2>
              <p className="text-gray-600 mb-1">Theme: {t.theme}</p>
              <p className="text-sm text-gray-500">{t.plantIds?.length || 0} plants</p>
            </div>

            {/* Start Tour Button */}
            <Link
              to={`/tours/${t._id}`}
              className="mt-4 inline-block bg-green-600 text-white font-medium px-4 py-2 rounded-full hover:bg-green-700 hover:shadow-lg transition-all duration-300 text-center"
            >
              Start Tour →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualTours;
