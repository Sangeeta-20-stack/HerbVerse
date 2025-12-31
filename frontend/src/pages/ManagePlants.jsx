// import AdminNavbar from "../components/AdminNavbar";
import PlantTable from "../components/PlantTable";

const ManagePlants = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#F2F7F0] to-[#E3F1E0] font-inter">

    {/* Page Header */}
   

    {/* Table */}
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <PlantTable />
    </div>

    {/* Footer */}
    <footer className="mt-12 py-6 text-center text-[#556B2F]/80 border-t border-[#A3C4A6]/30">
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
