import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getTourById } from "../services/tourApi";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const BASE_URL = "https://herbverse-backend-xg7z.onrender.com";

const PlantModel = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.004;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={3.5}
      position={[0, -0.5, 0]}
    />
  );
};

const VirtualTourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await getTourById(id);
        const tourData = res.data.tour || res.data;

        tourData.plantIds = tourData.plantIds.map((plant) => ({
          ...plant,
          modelUrl: plant.modelUrl ? `${BASE_URL}${plant.modelUrl}` : null,
          imageUrl:
            plant.images && plant.images.length > 0
              ? `${BASE_URL}${plant.images[0]}`
              : null,
        }));

        setTour(tourData);
      } catch {
        setError("Failed to load virtual tour");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  useEffect(() => {
    if (!tour || tour.plantIds.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPlantIndex((prev) =>
        prev === tour.plantIds.length - 1 ? 0 : prev + 1
      );
    }, tour.duration * 1000);

    return () => clearInterval(interval);
  }, [tour]);

  if (loading)
    return (
      <p className="p-6 text-center text-[#556B2F] font-medium">
        Loading tour...
      </p>
    );

  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-medium">
        {error}
      </p>
    );

  if (!tour || tour.plantIds.length === 0)
    return (
      <p className="p-6 text-center text-gray-500 font-medium">
        No plants available in this tour.
      </p>
    );

  const currentPlant = tour.plantIds[currentPlantIndex];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 min-h-screen">

      {/* 🌿 TOUR HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-2 text-[#556B2F]">
          {tour.title.split(" ").map((word, i) => (
            <span key={i} className="text-[#A3C4A6] mr-1">
              {word}
            </span>
          ))}
        </h1>
        <p className="mt-2 text-[#8B6D5C]/80 text-lg">
          Theme: {tour.theme} | Duration: {tour.duration}s per plant
        </p>
      </div>

      {/* 🌱 PLANT CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center hover:shadow-2xl transition-shadow duration-300">

        {/* 3D MODEL */}
        {currentPlant.modelUrl && (
          <div className="w-[28rem] h-[28rem] rounded-xl shadow-md flex-shrink-0">
            <Canvas>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <PlantModel modelUrl={currentPlant.modelUrl} />
              <OrbitControls enableZoom enableRotate />
            </Canvas>
          </div>
        )}

        {/* INFO */}
        <div className="flex flex-col md:ml-6 mt-4 md:mt-0 items-center md:items-start text-center md:text-left">

          {/* 🌿 PLANT NAME */}
          <h3 className="text-3xl md:text-4xl font-bold text-[#556B2F] mb-4">
            {currentPlant.name}
          </h3>

          {/* IMAGE */}
          {currentPlant.imageUrl && (
            <div className="mb-4">
              <img
                src={currentPlant.imageUrl}
                alt={currentPlant.name}
                className="w-40 h-40 object-cover rounded-xl shadow-lg mb-2"
              />
              {currentPlant.commonNames?.length > 0 && (
                <p className="font-semibold text-[#A3C4A6]">
                  {currentPlant.commonNames.join(", ")}
                </p>
              )}
            </div>
          )}

          {/* 🌱 DETAILS */}
          <ul className="space-y-1 text-gray-700">
            {currentPlant.botanicalName && (
              <li>
                <span className="font-semibold text-[#556B2F]">
                  Botanical Name:
                </span>{" "}
                {currentPlant.botanicalName}
              </li>
            )}
            {currentPlant.commonNames?.length > 0 && (
              <li>
                <span className="font-semibold text-[#556B2F]">
                  Common Names:
                </span>{" "}
                {currentPlant.commonNames.join(", ")}
              </li>
            )}
            {currentPlant.habitat && (
              <li>
                <span className="font-semibold text-[#556B2F]">
                  Habitat:
                </span>{" "}
                {currentPlant.habitat}
              </li>
            )}
            {currentPlant.medicinalUses?.length > 0 && (
              <li>
                <span className="font-semibold text-[#556B2F]">
                  Medicinal Uses:
                </span>{" "}
                {currentPlant.medicinalUses.join(", ")}
              </li>
            )}
            {currentPlant.cultivation && (
              <li>
                <span className="font-semibold text-[#556B2F]">
                  Cultivation:
                </span>{" "}
                Soil: {currentPlant.cultivation.soil}, Climate:{" "}
                {currentPlant.cultivation.climate}, Watering:{" "}
                {currentPlant.cultivation.watering}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* PROGRESS */}
      <p className="text-center text-gray-500">
        Showing plant {currentPlantIndex + 1} of {tour.plantIds.length}
      </p>
    </div>
  );
};

export default VirtualTourDetail;

