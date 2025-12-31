import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getTourById } from "../services/tourApi";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const BASE_URL = "http://localhost:5000";

const PlantModel = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  const ref = useRef();

  // Rotate model slowly
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.003;
  });

  return <primitive ref={ref} object={scene} scale={2} position={[0, -0.5, 0]} />;
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
      } catch (err) {
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

  if (loading) return <p className="p-6 text-center">Loading tour...</p>;
  if (error) return <p className="p-6 text-red-500 text-center">{error}</p>;
  if (!tour || tour.plantIds.length === 0)
    return <p className="p-6 text-gray-500 text-center">No plants available in this tour.</p>;

  const currentPlant = tour.plantIds[currentPlantIndex];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-green-50 min-h-screen">
      {/* Tour Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 text-green-800">{tour.title}</h1>
        <p className="text-gray-700 text-lg mb-1">Theme: {tour.theme}</p>
        <p className="text-gray-600">Duration: {tour.duration}s per plant</p>
      </div>

      {/* Plant Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 relative">
        {/* Plant Name */}
        <h3 className="text-3xl font-semibold mb-2 text-green-900">{currentPlant.name}</h3>

        {/* 3D Model */}
        {currentPlant.modelUrl && (
          <div className="w-full md:w-96 h-96 mb-4">
            <Canvas>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <PlantModel modelUrl={currentPlant.modelUrl} />
              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </div>
        )}

        {/* Plant Info: Botanical & Common Names */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {currentPlant.imageUrl && (
            <img
              src={currentPlant.imageUrl}
              alt={currentPlant.name}
              className="w-32 h-32 object-cover rounded-xl shadow-md mb-2 md:mb-0 md:ml-4"
            />
          )}
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-lg">{currentPlant.scientificName}</p>
            {currentPlant.commonNames?.length > 0 && (
              <p className="text-gray-500 text-sm">
                Common: {currentPlant.commonNames.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tour Progress */}
      <p className="text-center text-gray-500">
        Showing plant {currentPlantIndex + 1} of {tour.plantIds.length}
      </p>
    </div>
  );
};

export default VirtualTourDetail;
