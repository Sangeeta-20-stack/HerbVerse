// src/components/PlantCard.jsx
import React, { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { FaCube } from "react-icons/fa";
import { Link } from "react-router-dom";

const PlantModel = ({ modelUrl }) => {
  const gltf = useGLTF(modelUrl);
  if (!gltf?.scene) return null;
  return <primitive object={gltf.scene} />;
};

const PlantCard = ({ plant, role }) => {
  const [showModel, setShowModel] = useState(false);
  const audioRef = useRef();
  const BASE_URL = "http://localhost:5000";

 const imageUrl = plant.images && plant.images.length > 0 ? `${BASE_URL}${plant.images[0]}` : null;

  const modelUrl = plant.modelUrl ? `${BASE_URL}${plant.modelUrl}` : null;
  const audioUrl = plant.audio && plant.audio.length > 0 ? `${BASE_URL}/uploads/${plant.audio[0]}` : null;

  return (
    <div className="bg-[#fef7e3]/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-gray-200 max-w-xs mx-auto hover:shadow-[0_0_50px_rgba(110,231,183,0.6)] transition-transform hover:-translate-y-1">
      
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-playfair font-bold text-deepForest">{plant.name}</h2>
        {modelUrl && (
          <button onClick={() => setShowModel(!showModel)} title="View 3D Model" className="text-deepForest hover:text-mintGreen">
            <FaCube size={22} />
          </button>
        )}
      </div>

      <div className="w-full h-44 rounded-lg overflow-hidden mb-3 flex items-center justify-center bg-gray-100 border border-gray-300">
        {showModel && modelUrl ? (
          <Canvas>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2,2,5]} />
            <Suspense fallback={<Html center>Loading 3D model...</Html>}>
              <PlantModel modelUrl={modelUrl} />
            </Suspense>
            <OrbitControls enablePan enableZoom enableRotate />
          </Canvas>
        ) : imageUrl ? (
          <img src={imageUrl} alt={plant.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400">No image available</span>
        )}
      </div>

      <ul className="text-deepForest text-sm space-y-1 list-disc list-inside">
        {plant.botanicalName && <li><span className="font-semibold">Botanical Name:</span> {plant.botanicalName}</li>}
        {plant.commonNames?.length > 0 && <li><span className="font-semibold">Common Names:</span> {plant.commonNames.join(", ")}</li>}
        {plant.habitat && <li><span className="font-semibold">Habitat:</span> {plant.habitat}</li>}
        {plant.medicinalUses?.length > 0 && <li><span className="font-semibold">Medicinal Uses:</span> {plant.medicinalUses.join(", ")}</li>}
        {plant.cultivation && <li><span className="font-semibold">Cultivation:</span> Soil: {plant.cultivation.soil}, Climate: {plant.cultivation.climate}, Watering: {plant.cultivation.watering}</li>}
        {audioUrl && <li><audio ref={audioRef} src={audioUrl} controls className="mt-1 w-full" /></li>}
      </ul>

      <div className="mt-2 flex justify-between items-center">
        <Link to={`/plants/${plant._id}`} className="text-oliveAccent hover:underline">View Details</Link>
        {role === "user" && <button className="bg-mintGreen px-2 py-1 rounded text-[#081612]">Bookmark</button>}
      </div>
    </div>
  );
};

export default PlantCard;
