import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  // ✅ SAFE read
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-gradient-to-r from-[#071914]/95 via-[#0c2b22]/95 to-[#071914]/95
        border-b border-white/10
        shadow-[0_8px_30px_rgba(0,0,0,0.45)]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT */}
        <Link
          to="/plants"
          className="
            text-2xl font-extrabold tracking-wide
            bg-gradient-to-r from-mintGreen to-oliveAccent
            bg-clip-text text-transparent
            transition-all duration-300
            hover:tracking-widest
          "
        >
          HerbVerse
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* Hello User */}
          <span
            className="
              text-lg font-bold
              bg-gradient-to-r from-mintGreen to-oliveAccent
              bg-clip-text text-transparent
              tracking-wide
            "
          >
            Hello, {user?.name || "User"}
          </span>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              px-6 py-2 rounded-xl font-semibold
              bg-gradient-to-r from-mintGreen to-oliveAccent
              text-deepForest
              shadow-md shadow-mintGreen/30
              transition-all duration-300
              hover:scale-105 hover:shadow-lg hover:shadow-mintGreen/50
              active:scale-95
            "
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
