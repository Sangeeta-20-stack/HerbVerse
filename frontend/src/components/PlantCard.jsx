import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { FaCube, FaBookmark, FaRegBookmark, FaStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast"; // import toast

const PlantModel = ({ modelUrl }) => {
  const gltf = useGLTF(modelUrl);
  if (!gltf?.scene) return null;
  return <primitive object={gltf.scene} />;
};

const PlantCard = ({ plant, role }) => {
  const [showModel, setShowModel] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [note, setNote] = useState(null);
  const audioRef = useRef();
  const BASE_URL = "http://localhost:5000";
  const token = localStorage.getItem("token");

  const imageUrl =
    plant.images && plant.images.length > 0 ? `${BASE_URL}${plant.images[0]}` : null;
  const modelUrl = plant.modelUrl ? `${BASE_URL}${plant.modelUrl}` : null;
  const audioUrl =
    plant.audio && plant.audio.length > 0 ? `${BASE_URL}/uploads/${plant.audio[0]}` : null;

  // Fetch user-specific bookmark & note status on mount
  useEffect(() => {
    if (!token || role !== "user") return;

    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get("/auth/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmarked(res.data.bookmarks.some(b => b._id === plant._id));
        const existingNote = res.data.notes.find(n => n.plant._id === plant._id);
        if (existingNote) setNote(existingNote.text);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user data", { position: "top-center" });
      }
    };

    fetchUserData();
  }, [plant._id, role, token]);

  // Toggle bookmark
  const handleBookmark = async () => {
    if (!token) {
      toast.error("Please login to bookmark", { position: "top-center" });
      return;
    }
    try {
      if (bookmarked) {
        await axiosInstance.delete(`/auth/bookmark/${plant._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Bookmark removed", { position: "top-center" });
      } else {
        await axiosInstance.post(`/auth/bookmark/${plant._id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Bookmarked successfully", { position: "top-center" });
      }
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update bookmark", { position: "top-center" });
    }
  };

  // Delete note
  const handleNoteDelete = async () => {
    if (!token) {
      toast.error("Please login to delete note", { position: "top-center" });
      return;
    }
    try {
      await axiosInstance.delete(`/auth/note/${plant._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNote(null);
      toast.success("Note deleted", { position: "top-center" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete note", { position: "top-center" });
    }
  };

  return (
    <div className="bg-[#fef7e3]/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-gray-200 max-w-xs mx-auto hover:shadow-[0_0_50px_rgba(110,231,183,0.6)] transition-transform hover:-translate-y-1 relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-playfair font-bold text-deepForest">{plant.name}</h2>
        <div className="flex items-center gap-2">
          {modelUrl && (
            <button
              onClick={() => setShowModel(!showModel)}
              title="View 3D Model"
              className="text-deepForest hover:text-mintGreen"
            >
              <FaCube size={20} />
            </button>
          )}
          {role === "user" && (
            <button
              onClick={handleBookmark}
              title={bookmarked ? "Remove Bookmark" : "Bookmark"}
              className="p-1 rounded-full hover:bg-gray-200/50"
            >
              {bookmarked ? (
                <FaBookmark className="text-green-500" />
              ) : (
                <FaRegBookmark className="text-gray-400" />
              )}
            </button>
          )}
          {note && (
            <button
              onClick={handleNoteDelete}
              title={note}
              className="p-1 rounded-full bg-green-200/40 hover:bg-green-300/60"
            >
              <FaStickyNote className="text-yellow-700" />
            </button>
          )}
        </div>
      </div>

      {/* Image / 3D Model */}
      <div className="w-full h-44 rounded-lg overflow-hidden mb-3 flex items-center justify-center bg-gray-100 border border-gray-300">
        {showModel && modelUrl ? (
          <Canvas>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 5]} />
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

      {/* Info */}
      <ul className="text-deepForest text-sm space-y-1 list-disc list-inside">
        {plant.botanicalName && (
          <li><span className="font-semibold">Botanical Name:</span> {plant.botanicalName}</li>
        )}
        {plant.commonNames?.length > 0 && (
          <li><span className="font-semibold">Common Names:</span> {plant.commonNames.join(", ")}</li>
        )}
        {plant.habitat && <li><span className="font-semibold">Habitat:</span> {plant.habitat}</li>}
        {plant.medicinalUses?.length > 0 && (
          <li><span className="font-semibold">Medicinal Uses:</span> {plant.medicinalUses.join(", ")}</li>
        )}
        {plant.cultivation && (
          <li>
            <span className="font-semibold">Cultivation:</span> Soil: {plant.cultivation.soil}, Climate: {plant.cultivation.climate}, Watering: {plant.cultivation.watering}
          </li>
        )}
        {audioUrl && <li><audio ref={audioRef} src={audioUrl} controls className="mt-1 w-full" /></li>}
      </ul>

      {/* Footer */}
      <div className="mt-2 flex justify-between items-center">
        <Link to={`/plants/${plant._id}`} className="text-oliveAccent hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;
