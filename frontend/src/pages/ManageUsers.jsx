// import AdminNavbar from "../components/AdminNavbar";
import UserTable from "../components/UserTable";

const ManageUsers = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#f0f7f4] to-[#dff1e5] font-inter">

    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 text-center">

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-2">
        Manage Users
      </h1>
      <p className="text-green-800 text-lg md:text-xl opacity-80 mb-6">
        View and manage all registered users. Edit user details or remove inactive accounts easily.
      </p>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white p-4">
        <UserTable />
      </div>

    </div>
  </div>
);

export default ManageUsers;
