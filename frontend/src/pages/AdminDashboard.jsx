import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";
import { FaLeaf, FaUsers, FaRoute } from "react-icons/fa"; // FaRoute for tours

const AdminDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#eef6f1] to-[#d9f0e4] font-inter">
    {/* Navbar */}


    {/* Dashboard Header */}
    <div className="p-6 md:p-10 max-w-6xl mx-auto flex flex-col items-center text-center gap-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-2 tracking-wide drop-shadow-md text-gradient-to-r from-green-700 via-emerald-500 to-lime-500 animate-fadeIn">
        Welcome, Admin
      </h1>
      <p className="text-gray-700 text-lg md:text-xl max-w-2xl animate-fadeIn delay-200">
        Manage your plants, users, and virtual tours efficiently. Track growth, update information, and keep your database organized.
      </p>
    </div>

    {/* Dashboard Cards */}
    <div className="p-6 md:p-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Manage Plants */}
      <Link
        to="/admin/plants"
        className="bg-gradient-to-r from-[#A3C4A6] to-[#F5D547] text-[#556B2F] px-6 py-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl flex flex-col items-center justify-center text-center gap-3"
      >
        <FaLeaf className="text-4xl md:text-5xl" />
        <span className="text-2xl md:text-3xl font-bold">Manage Plants</span>
        <span className="text-gray-700 text-sm md:text-base">
          Add, edit, or delete plants with ease
        </span>
      </Link>

      {/* Manage Users */}
      <Link
        to="/admin/users"
        className="bg-gradient-to-r from-[#84A98C] to-[#52734D] text-white px-6 py-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl flex flex-col items-center justify-center text-center gap-3"
      >
        <FaUsers className="text-4xl md:text-5xl" />
        <span className="text-2xl md:text-3xl font-bold">Manage Users</span>
        <span className="text-gray-100 text-sm md:text-base">
          View, update, or remove users
        </span>
      </Link>

      {/* Manage Tours */}
      <Link
        to="/admin/tours"
        className="bg-gradient-to-r from-[#C9E4C5] to-[#7BB661] text-[#2E4D25] px-6 py-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl flex flex-col items-center justify-center text-center gap-3"
      >
        <FaRoute className="text-4xl md:text-5xl" />
        <span className="text-2xl md:text-3xl font-bold">Manage Tours</span>
        <span className="text-gray-800 text-sm md:text-base">
          Create, edit, or delete virtual tours
        </span>
      </Link>

    </div>

    {/* Animation & Gradient Utilities */}
    <style>
      {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fadeIn.delay-200 {
          animation-delay: 0.2s;
        }

        .text-gradient-to-r {
          background: linear-gradient(to right, #16a34a, #22c55e, #84cc16);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}
    </style>
  </div>
);

export default AdminDashboard;
