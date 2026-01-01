import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { FaCube, FaBookmark, FaRegBookmark, FaStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

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
  const BASE_URL = "https://herbverse-backend-xg7z.onrender.com";
  const token = localStorage.getItem("token");

  const imageUrl =
    plant.images && plant.images.length > 0 ? `${BASE_URL}${plant.images[0]}` : null;
  const modelUrl = plant.modelUrl ? `${BASE_URL}${plant.modelUrl}` : null;
  const audioUrl =
    plant.audio && plant.audio.length > 0 ? `${BASE_URL}/uploads/${plant.audio[0]}` : null;

  // Fetch user-specific bookmark & note status
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
    if (!token) return toast.error("Please login to bookmark", { position: "top-center" });
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
    if (!token) return toast.error("Please login to delete note", { position: "top-center" });
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
    <div
  className="
    bg-[#F9F8F3]/95 backdrop-blur-lg
    rounded-3xl p-5
    border border-[#A3C4A6]/40
    shadow-lg
    max-w-xs mx-auto
    relative
    transition-all duration-300
    hover:-translate-y-1
    hover:shadow-[0_20px_50px_rgba(85,107,47,0.25)]
  "
>


      {/* Header */}
     <div className="
  flex justify-between items-center mb-3
  pb-2
  border-b border-[#A3C4A6]/30
">

        <h2 className="text-2xl font-extrabold tracking-wide font-playfair text-[#556B2F]">
{plant.name}</h2>
        <div className="flex items-center gap-2">
          {modelUrl && (
            <button
              onClick={() => setShowModel(!showModel)}
              title="View 3D Model"
              className="
  text-[#556B2F]
  hover:text-[#F5D547]
  transition-colors duration-300
  hover:scale-110
"

            >
              <FaCube size={20} />
            </button>
          )}
          {role === "user" && (
            <button
              onClick={handleBookmark}
              title={bookmarked ? "Remove Bookmark" : "Bookmark"}
              className="p-1 rounded-full hover:bg-[#A3C4A6]/20 transition-colors"
            >
              {bookmarked ? (
                <FaBookmark className="text-[#556B2F]" />
              ) : (
                <FaRegBookmark className="text-[#8B6D5C]" />
              )}
            </button>
          )}
          {note && (
            <button
              onClick={handleNoteDelete}
              title={note}
              className="p-1 rounded-full bg-[#F5D547]/30 hover:bg-[#F5D547]/50 transition-colors"
            >
              <FaStickyNote className="text-[#556B2F]" />
            </button>
          )}
        </div>
      </div>

      {/* Image / 3D Model */}
      <div
  className="
    w-full h-44 mb-3
    rounded-2xl
    overflow-hidden
    flex items-center justify-center
    bg-[#F9F8F3]
    border border-[#A3C4A6]/50
    shadow-inner
  "
>

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
          <img src={imageUrl} alt={plant.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
 />
        ) : (
          <span className="text-[#8B6D5C]">No image available</span>
        )}
      </div>

      {/* Info */}
      <ul
  className="
    text-[#556B2F] text-sm space-y-1
    list-disc list-inside
    bg-white/70
    border border-[#A3C4A6]/30
    rounded-xl
    p-3
  "
>

        {plant.botanicalName && <li><span className="font-semibold text-[#556B2F] tracking-wide">
Botanical Name:</span> {plant.botanicalName}</li>}
        {plant.commonNames?.length > 0 && <li><span className="font-semibold text-[#556B2F] tracking-wide">
Common Names:</span> {plant.commonNames.join(", ")}</li>}
        {plant.habitat && <li><span className="font-semibold text-[#556B2F] tracking-wide">
Habitat:</span> {plant.habitat}</li>}
        {plant.medicinalUses?.length > 0 && <li><span className="font-semibold text-[#556B2F] tracking-wide">
Medicinal Uses:</span> {plant.medicinalUses.join(", ")}</li>}
        {plant.cultivation && (
          <li>
           <span className="font-semibold text-[#556B2F] tracking-wide">
Cultivation:</span> Soil: {plant.cultivation.soil}, Climate: {plant.cultivation.climate}, Watering: {plant.cultivation.watering}
          </li>
        )}
        {audioUrl && <li><audio ref={audioRef} src={audioUrl} controls className="mt-1 w-full" /></li>}
      </ul>

      {/* Footer */}
      <div
  className="
    mt-4 pt-3
    flex justify-between items-center
    border-t border-[#A3C4A6]/30
  "
>

        <Link to={`/plants/${plant._id}`} className="
  text-[#556B2F] font-semibold
  hover:text-[#F5D547]
  transition-colors duration-300
"
>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;

