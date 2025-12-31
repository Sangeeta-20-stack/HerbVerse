// import AdminNavbar from "../components/AdminNavbar";
import UserTable from "../components/UserTable";

const ManageUsers = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#eef6f1] to-[#d9f0e4] font-inter">

    {/* Page Header */}
    

    {/* Table Container */}
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <UserTable />
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

export default ManageUsers;
