import React from "react";
import { Users, FileQuestion, Activity, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,245", icon: <Users size={28} />, color: "from-indigo-500 to-indigo-700" },
    { title: "Total Quizzes", value: "48", icon: <FileQuestion size={28} />, color: "from-purple-500 to-indigo-600" },
    { title: "Active Sessions", value: "312", icon: <Activity size={28} />, color: "from-pink-500 to-rose-600" },
    { title: "Analytics Reports", value: "12", icon: <BarChart3 size={28} />, color: "from-teal-500 to-cyan-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard Overview</h1>
      <p className="text-gray-500 mb-6">Welcome back, Admin 👋</p>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl text-white shadow-md bg-gradient-to-r ${item.color} transform hover:scale-[1.03] hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
              </div>
              <div className="bg-white/25 p-3 rounded-lg">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ANALYTICS PLACEHOLDER */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Analytics</h2>
        <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-400">📊 Chart will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
