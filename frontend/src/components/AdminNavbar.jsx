import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

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
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center font-inter">

        {/* LEFT LINKS */}
        <div className="flex items-center gap-8">
          {[
            { label: "Garden", path: "/plants" },
            { label: "Plants", path: "/admin/plants" },
            { label: "Users", path: "/admin/users" },
            { label: "Tours", path: "/admin/tours" },
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="
                relative text-lg font-semibold text-[#556B2F]
                transition-all duration-300
                hover:text-[#A3C4A6] hover:-translate-y-0.5
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-[#A3C4A6]
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
          <span className="text-lg font-bold text-[#556B2F] select-none">
            Hello, {admin?.name || "Admin"}
          </span>

          {/* Logout Button */}
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

export default AdminNavbar;
