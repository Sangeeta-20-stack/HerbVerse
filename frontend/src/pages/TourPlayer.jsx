import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { speakText, stopSpeech } from "../utils/speech";
import TourMiniMap from "../components/TourMiniMap";
import TourControls from "../components/TourControls";

const TourPlayer = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/tours/${id}`).then((res) => {
      setTour(res.data);
    });
  }, [id]);

  useEffect(() => {
    if (!tour || !playing) return;

    speakText(tour.plantIds[index]?.description || "");

    const timer = setTimeout(() => {
      setIndex((prev) =>
        prev + 1 < tour.plantIds.length ? prev + 1 : prev
      );
    }, (tour.duration || 5) * 1000);

    return () => {
      clearTimeout(timer);
      stopSpeech();
    };
  }, [index, playing, tour]);

  if (!tour) return <p className="text-white">Loading tour...</p>;

  const plant = tour.plantIds[index];

  return (
    <div className="min-h-screen grid grid-cols-4 bg-black text-white">
      {/* Mini Map */}
      <TourMiniMap
        plants={tour.plantIds}
        activeIndex={index}
        onJump={setIndex}
      />

      {/* Main View */}
      <div className="col-span-3 p-8">
        <h1 className="text-3xl font-bold">{plant.name}</h1>
        <p className="text-gray-300 mt-4">{plant.description}</p>

        <TourControls
          playing={playing}
          setPlaying={setPlaying}
          index={index}
          total={tour.plantIds.length}
          setIndex={setIndex}
          plantId={plant._id}
        />
      </div>
    </div>
  );
};

export default TourPlayer;
