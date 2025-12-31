const TourMiniMap = ({ plants, activeIndex, onJump }) => {
  return (
    <div className="bg-white/5 p-4 overflow-y-auto">
      <h3 className="text-lg mb-3">Tour Map</h3>

      {plants.map((p, i) => (
        <button
          key={p._id}
          onClick={() => onJump(i)}
          className={`block w-full text-left px-3 py-2 mb-1 rounded ${
            i === activeIndex
              ? "bg-mintGreen text-black"
              : "bg-black text-white"
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
};

export default TourMiniMap;
