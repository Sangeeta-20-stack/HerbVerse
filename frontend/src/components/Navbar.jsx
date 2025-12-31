import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="
      sticky top-0 z-50
      backdrop-blur-lg
      bg-[#556B2F]    /* Solid primary olive color */
      border-b border-[#8B6D5C]/40
      shadow-md
      animate-[navEnter_0.6s_ease-out]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 🌿 Brand Logo */}
        <div className="cursor-pointer select-none">
          <span
            className="
            text-3xl font-extrabold tracking-wider
            text-[#F9F8F3]    /* Off-white text */
            hover:text-[#F5D547]   /* Sunflower yellow on hover */
            transition-colors duration-300"
          >
            HerbVerse
          </span>
        </div>

        {/* 🔗 Right Navigation */}
        <div className="flex items-center gap-6 text-[#F9F8F3]">

          {["Home", "Plants"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : "/plants"}
              className="
              relative text-lg font-medium group
              transition-transform duration-300
              hover:-translate-y-0.5
              hover:text-[#F5D547]"
            >
              {item}
              <span
                className="absolute left-0 -bottom-1 w-0 h-[2px]
                bg-[#F5D547] group-hover:w-full transition-all duration-300"
              />
            </Link>
          ))}

          {/* Login / Signup Button */}
          <Link
            to="/login"
            className="
            px-6 py-2 rounded-2xl text-base font-semibold
            bg-[#A3C4A6]    /* Soft sage solid button */
            text-[#556B2F]
            hover:bg-[#F5D547]   /* Sunflower yellow on hover */
            hover:text-[#556B2F]
            hover:scale-105
            transition-all duration-300"
          >
            Login / Signup
          </Link>

        </div>
      </div>

      {/* Animations */}
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

export default Navbar;
