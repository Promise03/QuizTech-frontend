import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, Users, Trash2, CheckCircle2, AlertTriangle } from "lucide-react";

const UsersPage = () => {

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, type: "", message: "" });

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/alluser`);
      const usersArray = res.data.userDetails || [];
      setUsers(usersArray);
      setFiltered(usersArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔍 Search & filter
  useEffect(() => {
    let data = users;
    if (roleFilter !== "all") {
      data = data.filter((u) => u.role?.toLowerCase() === roleFilter);
    }
    if (search.trim() !== "") {
      data = data.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(data);
  }, [search, roleFilter, users]);

  // 🗑️ Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/users/delete/${id}`);
      setModal({
        show: true,
        type: "success",
        message: "User deleted successfully!",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setModal({
        show: true,
        type: "error",
        message: "Failed to delete user.",
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-indigo-600" />
            Users Management
          </h1>
          <p className="text-gray-500 text-sm">Manage all platform users</p>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
            <select
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="regular">Regular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 text-center py-10">Loading users...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-left text-gray-700 uppercase text-sm">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-indigo-200 text-indigo-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                 
                  <td className="p-3 flex justify-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Reusable Success/Error Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-3">
            {modal.type === "success" ? (
              <CheckCircle2 className="text-green-500" size={40} />
            ) : (
              <AlertTriangle className="text-red-500" size={40} />
            )}
            <p className="text-gray-700 text-center">{modal.message}</p>
            <button
              onClick={() => setModal({ show: false, type: "", message: "" })}
              className={`px-4 py-2 rounded-lg text-white ${
                modal.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
