import { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import axiosInstance from "../utils/axiosInstance";

const PlantModel = ({ modelUrl }) => {
  const gltf = useGLTF(modelUrl);
  if (!gltf?.scene) return null;
  return <primitive object={gltf.scene} scale={1} position={[0, -0.5, 0]} />;
};

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await axiosInstance.get(`/plants/${id}`);
        setPlant(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading...</p>;
  if (!plant) return <p className="text-center mt-10 text-red-500">Plant not found</p>;

  const imageUrl = plant.images?.[0] ? `${BASE_URL}${plant.images[0]}` : null;
  const modelUrl = plant.modelUrl ? `${BASE_URL}${plant.modelUrl}` : null;

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#e9f3f2] to-[#fefcfb] font-inter flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT: Image / 3D Model */}
        <div className="flex flex-col gap-6">
          {imageUrl && (
            <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-green-700 shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={imageUrl}
                alt={plant.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          {modelUrl && (
            <div className="w-full h-96 rounded-xl border-2 border-green-700 shadow-xl bg-gray-900">
              <Canvas camera={{ position: [0, 1, 2.5] }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 2, 5]} intensity={1} />
                <Suspense fallback={<Html center className="text-gray-200">Loading 3D model...</Html>}>
                  <PlantModel modelUrl={modelUrl} />
                </Suspense>
                <OrbitControls enablePan enableZoom enableRotate zoomSpeed={0.8} />
              </Canvas>
            </div>
          )}

          {/* Bookmark Button */}
          {role === "user" && (
            <button className="mt-4 px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-mintGreen to-oliveAccent text-black shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300">
              Bookmark
            </button>
          )}
        </div>

        {/* RIGHT: Plant Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-extrabold text-gradient-to-r from-mintGreen to-oliveAccent mb-2">
            {plant.name}
          </h1>
          <p className="text-gray-600 italic text-lg">{plant.shortDescription || plant.habitat}</p>

          <div className="flex flex-col gap-4 mt-4">
            {[
              { title: "Scientific Name", value: [plant.botanicalName || plant.scientificName] },
              { title: "Common Names", value: plant.commonNames },
              { title: "Habitat", value: plant.habitat ? [plant.habitat] : [] },
              { title: "Medicinal Uses", value: plant.medicinalUses },
              {
                title: "Cultivation",
                value: plant.cultivation
                  ? [
                      plant.cultivation.soil && `Soil: ${plant.cultivation.soil}`,
                      plant.cultivation.climate && `Climate: ${plant.cultivation.climate}`,
                      plant.cultivation.watering && `Watering: ${plant.cultivation.watering}`,
                    ].filter(Boolean)
                  : [],
              },
            ].map(
              (section, i) =>
                section.value?.length > 0 && (
                  <div key={i} className="p-4 rounded-xl bg-white/20 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold text-mintGreen mb-2">{section.title}</h2>
                    <ul className="list-disc list-inside ml-5 text-gray-700 space-y-1">
                      {section.value.map((val, idx) => (
                        <li key={idx}>{val}</li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
