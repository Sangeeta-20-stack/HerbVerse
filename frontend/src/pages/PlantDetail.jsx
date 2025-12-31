import { useEffect, useState, Suspense, useRef } from "react";
import { useParams } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const PlantModel = ({ modelUrl }) => {
  const gltf = useGLTF(modelUrl);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.003;
  });

  if (!gltf?.scene) return null;

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={1}
      position={[0, -0.5, 0]}
    />
  );
};

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [note, setNote] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await axiosInstance.get(`/plants/${id}`);
        setPlant(res.data);
      } catch {
        toast.error("Failed to fetch plant data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!plant) return <p className="text-center mt-10 text-red-500">Plant not found</p>;

  const imageUrl = plant.images?.[0] ? `${BASE_URL}${plant.images[0]}` : null;
  const modelUrl = plant.modelUrl ? `${BASE_URL}${plant.modelUrl}` : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef6f1] to-[#fefcfb] font-inter py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">

        {/* LEFT */}
        <div className="flex flex-col gap-6">
          {imageUrl && (
            <div className="h-96 rounded-2xl overflow-hidden border border-[#A3C4A6] shadow-xl">
              <img src={imageUrl} alt={plant.name} className="w-full h-full object-cover" />
            </div>
          )}

          {modelUrl && (
            <div className="h-96 rounded-2xl border border-[#A3C4A6] shadow-xl bg-gray-900">
              <Canvas camera={{ position: [0, 1, 2.5] }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 2, 5]} />
                <Suspense fallback={<Html center className="text-white">Loading 3D model...</Html>}>
                  <PlantModel modelUrl={modelUrl} />
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">

          {/* 🌿 MAIN PLANT NAME (UPDATED COLOR) */}
          <h1 className="text-5xl font-playfair font-extrabold text-[#556B2F]">
            {plant.name}
          </h1>

          <p className="text-[#8B6D5C] italic text-lg">
            {plant.shortDescription || plant.habitat}
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {[
              { title: "Scientific Name", value: [plant.botanicalName] },
              { title: "Common Names", value: plant.commonNames },
              { title: "Family", value: [plant.family] },
              { title: "Habitat", value: [plant.habitat] },
              { title: "Region", value: plant.region },
              { title: "Medicinal Uses", value: plant.medicinalUses },
              { title: "Preparation Methods", value: plant.preparationMethods },
              { title: "Dosage", value: plant.dosage ? [plant.dosage] : [] },
              { title: "Precautions", value: plant.precautions ? [plant.precautions] : [] },
            ].map(
              (section, i) =>
                section.value?.length > 0 && (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/70 backdrop-blur shadow-md hover:shadow-lg transition"
                  >

                    {/* 🌱 BULLET HEADING COLOR MATCHED */}
                    <h2 className="text-xl font-bold text-[#556B2F] mb-2">
                      {section.title}
                    </h2>

                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
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
