import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

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
        bg-[#F9F8F3]/95
        border-b border-[#A3C4A6]/30
        shadow-[0_8px_30px_rgba(0,0,0,0.15)]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT */}
        <Link
          to="/plants"
          className="
            text-2xl font-extrabold tracking-wide
            text-[#556B2F]
            transition-all duration-300
            hover:text-[#F5D547] hover:tracking-widest
          "
        >
          HerbVerse
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* Hello User */}
          <span className="text-lg font-bold text-[#556B2F] select-none">
            Hello, {user?.name || "User"}
          </span>

          {/* Virtual Tours Link */}
          <Link
            to="/tours"
            className="
              px-4 py-2 rounded-xl font-semibold
              bg-[#A3C4A6]
              text-[#556B2F]
              shadow-md shadow-[#A3C4A6]/30
              transition-all duration-300
              hover:bg-[#F5D547] hover:text-[#556B2F] hover:scale-105 hover:shadow-lg hover:shadow-[#F5D547]/50
              active:scale-95
            "
          >
            Virtual Tours
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              px-6 py-2 rounded-xl font-semibold
              bg-[#A3C4A6]
              text-[#556B2F]
              shadow-md shadow-[#A3C4A6]/30
              transition-all duration-300
              hover:bg-[#F5D547] hover:text-[#556B2F] hover:scale-105 hover:shadow-lg hover:shadow-[#F5D547]/50
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
