import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await axiosInstance.put(`/admin/users/${id}`, { role });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update role.");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axiosInstance.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert("Failed to delete user.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-green-800 text-center mt-6">Loading users...</p>;

  return (
    <div className="space-y-10 px-4 md:px-0 max-w-7xl mx-auto">

      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#556B2F]">
          Manage <span className="text-[#A3C4A6]">Users</span>
        </h1>
        <p className="mt-4 text-[#8B6D5C]/75 max-w-3xl mx-auto">
          View all users, update roles, or remove users from the system with ease.
        </p>
      </header>

      {/* Table */}
      {users.length === 0 ? (
        <p className="text-center text-gray-500 p-6 bg-white rounded-2xl shadow-lg">
          No users found
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-xl">
          <table className="min-w-full bg-white rounded-2xl overflow-hidden">
            <thead className="bg-gradient-to-r from-[#556B2F] to-[#A3C4A6] text-white">
              <tr>
                <th className="p-4 text-left font-semibold tracking-wide">Name</th>
                <th className="p-4 text-left font-semibold tracking-wide">Email</th>
                <th className="p-4 text-left font-semibold tracking-wide">Role</th>
                <th className="p-4 text-left font-semibold tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr
                  key={u._id}
                  className={`transition-all duration-300 ${
                    idx % 2 === 0 ? "bg-green-50" : "bg-green-100"
                  } hover:bg-green-200`}
                >
                  <td className="p-4 font-medium text-green-800">{u.name}</td>
                  <td className="p-4 text-green-700">{u.email}</td>
                  <td className="p-4 capitalize font-semibold text-green-800">{u.role}</td>
                  <td className="p-4 flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        updateRole(u._id, u.role === "user" ? "admin" : "user")
                      }
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Switch Role
                    </button>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
