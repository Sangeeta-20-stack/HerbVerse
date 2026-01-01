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
        backdrop-blur-lg
        bg-[#556B2F]
        border-b border-[#8B6D5C]/40
        shadow-md
        animate-[navEnter_0.6s_ease-out]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 🌿 HerbVerse Brand — EXACT STYLE AS REQUESTED */}
        <div className="cursor-pointer select-none">
          <span
            className="
              text-3xl font-extrabold tracking-wider font-playfair
    text-[#F9F8F3]
    hover:text-[#F5D547]
    transition-colors duration-300
            "
            onClick={() => navigate("/plants")}
          >
            HerbVerse
          </span>
        </div>

        {/* 🔗 Right Navigation */}
        <div className="flex items-center gap-6 text-[#F9F8F3]">

          {/* Hello Username — SAME STYLE AS NAV LINKS */}
          <span
            className="
              relative text-lg font-playfair group
              transition-transform duration-300
              hover:-translate-y-0.5
              hover:text-[#F5D547]
              select-none
            "
          >
            Hello, {user?.name || "User"}
            <span
              className="
                absolute left-0 -bottom-1 w-0 h-[2px]
                bg-[#F5D547]
                group-hover:w-full
                transition-all duration-300
              "
            />
          </span>

          {/* Nav Links */}
          {[
  { label: "Home", path: "/" },
  { label: "Plants", path: "/plants" },
  { label: "Tours", path: "/tours" },
].map(({ label, path }) => (
  <Link
    key={label}
    to={path}
    className="
      relative text-lg font-playfair group
      transition-transform duration-300
      hover:-translate-y-0.5
      hover:text-[#F5D547]
    "
  >
    {label}
    <span
      className="
        absolute left-0 -bottom-1 w-0 h-[2px]
        bg-[#F5D547]
        group-hover:w-full
        transition-all duration-300
      "
    />
  </Link>
))}


          {/* Logout Button — unchanged */}
          <button
            onClick={logout}
            className="
              px-6 py-2 rounded-2xl text-base font-playfair
              bg-[#A3C4A6]
              text-[#556B2F]
              hover:bg-[#F5D547]
              hover:text-[#556B2F]
              hover:scale-105
              transition-all duration-300
            "
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navbar entry animation */}
      <style>
        {`
          @keyframes navEnter {
            from { opacity: 0; transform: translateY(-16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </nav>
  );
};

export default UserNavbar;
