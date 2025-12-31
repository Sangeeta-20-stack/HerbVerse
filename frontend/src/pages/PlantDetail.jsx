import { useEffect, useState, Suspense, useRef } from "react";
import { useParams } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const PlantModel = ({ modelUrl }) => {
  const gltf = useGLTF(modelUrl);
  const ref = useRef();

  // Auto rotate model
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003; // slow rotation
    }
  });

  if (!gltf?.scene) return null;

  const handlePointerOver = (e) => {
    e.stopPropagation();
    e.object.material && (e.object.material.emissive.setHex(0x00ff00)); // glow effect
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    e.object.material && (e.object.material.emissive.setHex(0x000000)); // reset glow
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const partName = e.object.name || "unknown part";
    toast(`Clicked on: ${partName}`);
  };

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={1}
      position={[0, -0.5, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
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
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch plant data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      if (role !== "user") return;
      try {
        const res = await axiosInstance.get("/auth/data", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookmarked(res.data.bookmarks.some(b => b._id === id));

        const existingNote = res.data.notes.find(n => n.plant._id === id);
        if (existingNote) {
          setNote(existingNote.text);
          setNoteInput(existingNote.text);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlant();
    fetchUserData();
  }, [id, role, token]);

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        await axiosInstance.delete(`/auth/bookmark/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Bookmark removed!");
      } else {
        await axiosInstance.post(`/auth/bookmark/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Bookmarked!");
      }
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update bookmark.");
    }
  };

  const handleNoteSave = async () => {
    try {
      await axiosInstance.post(
        `/auth/note/${id}`,
        { text: noteInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNote(noteInput);
      toast.success("Note saved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save note.");
    }
  };

  const handleNoteDelete = async () => {
    try {
      await axiosInstance.delete(`/auth/note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNote("");
      setNoteInput("");
      toast.success("Note deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete note.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading...</p>;
  if (!plant) return <p className="text-center mt-10 text-red-500">Plant not found</p>;

  const imageUrl = plant.images?.[0] ? `${BASE_URL}${plant.images[0]}` : null;
  const modelUrl = plant.modelUrl ? `${BASE_URL}${plant.modelUrl}` : null;

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#e9f3f2] to-[#fefcfb] font-inter flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT: Image / 3D Model + Bookmark & Note */}
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
                <OrbitControls
                  enablePan
                  enableZoom
                  enableRotate
                  autoRotate
                  autoRotateSpeed={0.5}
                  zoomSpeed={0.8}
                />
              </Canvas>
            </div>
          )}

          {role === "user" && (
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={handleBookmark}
                className={`px-6 py-2 rounded-xl font-semibold text-black shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ${
                  bookmarked ? "bg-red-400" : "bg-gradient-to-r from-mintGreen to-oliveAccent"
                }`}
              >
                {bookmarked ? "Remove Bookmark" : "Bookmark"}
              </button>

              <textarea
                rows={4}
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="Add your personal note..."
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleNoteSave}
                  className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  Save Note
                </button>
                {note && (
                  <button
                    onClick={handleNoteDelete}
                    className="px-4 py-2 rounded-xl font-semibold bg-red-400 text-white shadow-md hover:bg-red-500 transition-colors"
                  >
                    Delete Note
                  </button>
                )}
              </div>

              {note && <p className="text-gray-700 italic mt-1">Your saved note: {note}</p>}
            </div>
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
              { title: "Scientific Name", value: [plant.botanicalName] },
              { title: "Common Names", value: plant.commonNames },
              { title: "Family", value: [plant.family] },
              { title: "Habitat", value: [plant.habitat] },
              { title: "Region", value: plant.region },
              { title: "Medicinal Uses", value: plant.medicinalUses },
              { title: "Preparation Methods", value: plant.preparationMethods },
              { title: "Dosage", value: plant.dosage ? [plant.dosage] : [] },
              { title: "Precautions", value: plant.precautions ? [plant.precautions] : [] },
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
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/20 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
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
