import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  // ✅ SAFE read
  let admin = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      admin = JSON.parse(storedUser);
    }
  } catch {
    admin = null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT LINKS */}
        <div className="flex items-center gap-8 text-softWhite">
          {[
            { label: "Garden", path: "/plants" },
            { label: "Plants", path: "/admin/plants" },
            { label: "Users", path: "/admin/users" },
            {label :"Tours" , path:"/admin/tours"},
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="
                relative text-lg font-semibold
                transition-all duration-300
                hover:text-mintGreen hover:-translate-y-0.5
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-mintGreen
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {label}
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">

          {/* Hello Admin */}
          <span
            className="
              text-lg font-bold
              bg-gradient-to-r from-mintGreen to-oliveAccent
              bg-clip-text text-transparent
              tracking-wide
            "
          >
            Hello, {admin?.name || "Admin"}
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

export default AdminNavbar;
