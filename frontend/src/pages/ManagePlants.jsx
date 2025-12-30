// import AdminNavbar from "../components/AdminNavbar";
import PlantTable from "../components/PlantTable";

const ManagePlants = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#eef6f1] to-[#d9f0e4] font-inter">
    
    {/* Page Header */}
    <div className="p-6 md:p-10 max-w-6xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2 animate-fadeIn">
        Manage Plants
      </h1>
      <p className="text-gray-700 text-lg md:text-xl animate-fadeIn delay-200">
        Add, edit, or remove plants from your garden database.
      </p>
    </div>

    {/* Table */}
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <PlantTable />
    </div>

    {/* Footer */}
    <footer className="mt-12 py-6 text-center text-gray-600">
      © 2025 HerbVerse. All rights reserved.
    </footer>

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

export default ManagePlants;
