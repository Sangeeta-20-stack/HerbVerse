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
    return <p className="text-gray-700 text-center mt-6">Loading users...</p>;

  return (
    <div className="space-y-6 px-4 md:px-0 max-w-6xl mx-auto">
      {users.length === 0 ? (
        <p className="text-center text-gray-500 p-6 bg-white rounded-2xl shadow-lg">
          No users found
        </p>
      ) : (
        <table className="min-w-full rounded-2xl overflow-hidden border border-green-200 bg-green-50 shadow-md">
          <thead className="bg-gradient-to-r from-mintGreen to-oliveAccent text-white">
            <tr>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Role</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u._id}
                className={`transition-all duration-300 transform hover:scale-101 ${
                  idx % 2 === 0 ? "bg-green-50" : "bg-green-100"
                }`}
              >
                <td className="p-4 font-medium text-green-900">{u.name}</td>
                <td className="p-4 text-green-800">{u.email}</td>
                <td className="p-4 capitalize font-semibold">{u.role}</td>
                <td className="p-4 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      updateRole(u._id, u.role === "user" ? "admin" : "user")
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-400 shadow hover:shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    Toggle Role
                  </button>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-xl hover:bg-cyan-400 shadow hover:shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
