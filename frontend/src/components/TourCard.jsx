import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-5 hover:scale-105 transition">
      <h2 className="text-xl text-white font-semibold">{tour.title}</h2>
      <p className="text-sm text-gray-300 mt-2">{tour.theme}</p>
      <p className="text-sm text-gray-400 mt-1">
        Plants: {tour.plantIds.length}
      </p>

      <Link
        to={`/tours/${tour._id}`}
        className="inline-block mt-4 px-4 py-2 bg-mintGreen text-black rounded"
      >
        Start Tour
      </Link>
    </div>
  );
};

export default TourCard;
