import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="
      sticky top-0 z-50
      backdrop-blur-md
      bg-gradient-to-r from-[#0b1f1a]/90 via-[#0f2a23]/90 to-[#0b1f1a]/90
      border-b border-white/10
      animate-[navEnter_0.6s_ease-out]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 🌿 Brand Logo */}
        <div className="cursor-pointer select-none">
          <span
            className="text-3xl font-extrabold tracking-wider
            bg-gradient-to-r from-mintGreen via-emerald-400 to-oliveAccent
            bg-clip-text text-transparent
            hover:tracking-widest transition-all duration-300"
          >
            HerbVerse
          </span>
        </div>

        {/* 🔗 Right Navigation */}
        <div className="flex items-center gap-4 text-softWhite">

          {["Home", "Plants", "Virtual Tours"].map((item) => (
            <Link
              key={item}
              to={
                item === "Home"
                  ? "/"
                  : item === "Plants"
                  ? "/plants"
                  : "/virtual-tours"
              }
              className="
              relative text-lg font-medium group
              transition-transform duration-300
              hover:-translate-y-0.5"
            >
              <span className="group-hover:text-mintGreen transition-colors duration-300">
                {item}
              </span>
              <span
                className="absolute left-0 -bottom-1 w-0 h-[2px]
                bg-mintGreen group-hover:w-full transition-all duration-300"
              />
            </Link>
          ))}

          {/* Single Login / Signup Button */}
          <Link
            to="/login"
            className="
            px-5 py-2 rounded-xl text-base font-semibold
            bg-gradient-to-r from-mintGreen to-oliveAccent
            text-deepForest
            hover:scale-105 hover:shadow-lg hover:shadow-mintGreen/30
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