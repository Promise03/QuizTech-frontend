import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, Users } from "lucide-react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch users from backend
  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/users/alluser");

      // ✅ Extract the array correctly
      const usersArray = res.data.userDetails || [];

      setUsers(usersArray);
      setFiltered(usersArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


  // 🔍 Search + Filter logic
  useEffect(() => {
    let data = users;

    // Filter by role
    if (roleFilter !== "all") {
      data = data.filter((u) => u.role?.toLowerCase() === roleFilter);
    }

    // Search by name or email
    if (search.trim() !== "") {
      data = data.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [search, roleFilter, users]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
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
                <th className="p-3">Created At</th>
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
                  <td className="p-3 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
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

export default UsersPage;
