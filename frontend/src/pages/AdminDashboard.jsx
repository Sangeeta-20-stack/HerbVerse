import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";
import { FaLeaf, FaUsers } from "react-icons/fa";

const AdminDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#eef6f1] to-[#d9f0e4] font-inter">
    {/* Navbar */}
    

    {/* Dashboard Header */}
    <div className="p-6 md:p-10 max-w-6xl mx-auto flex flex-col items-center text-center gap-4">
      <h1 className="text-5xl font-extrabold text-green-900 animate-fadeIn">
        Welcome, Admin
      </h1>
      <p className="text-gray-700 text-lg md:text-xl max-w-2xl animate-fadeIn delay-200">
        Manage your plants and users efficiently. Track growth, update information, and keep your database organized.
      </p>
    </div>

    {/* Dashboard Cards */}
    <div className="p-6 md:p-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Manage Plants */}
      <Link
        to="/admin/plants"
        className="bg-gradient-to-r from-mintGreen to-oliveAccent text-black px-6 py-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl flex flex-col items-center justify-center text-center gap-3"
      >
        <FaLeaf className="text-4xl md:text-5xl" />
        <span className="text-2xl md:text-3xl font-bold">Manage Plants</span>
        <span className="text-gray-900 text-sm md:text-base">
          Add, edit, or delete plants with ease
        </span>
      </Link>

      {/* Manage Users */}
      <Link
        to="/admin/users"
        className="bg-gradient-to-r from-green-700 to-green-900 text-white px-6 py-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl flex flex-col items-center justify-center text-center gap-3"
      >
        <FaUsers className="text-4xl md:text-5xl" />
        <span className="text-2xl md:text-3xl font-bold">Manage Users</span>
        <span className="text-gray-100 text-sm md:text-base">
          View, update, or remove users
        </span>
      </Link>
    </div>

   

    {/* Animation Keyframes */}
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
      `}
    </style>
  </div>
);

export default AdminDashboard;
