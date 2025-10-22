import React, { useEffect, useState } from "react";
import { Users, FileQuestion, Activity, BarChart3 } from "lucide-react";

const API_BASE_URL = "http://localhost:5002/api/analytics";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocs: 0,
    totalQuiz: 0,
    userRoles: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [userRes, docRes, quizRes, roleRes] = await Promise.all([
          fetch(`${API_BASE_URL}/alluser`),
          fetch(`${API_BASE_URL}/allDoc`),
          fetch(`${API_BASE_URL}/allQuiz`),
          fetch(`${API_BASE_URL}/alluserbyrole`),
        ]);

        const [userData, docData, quizData, roleData] = await Promise.all([
          userRes.json(),
          docRes.json(),
          quizRes.json(),
          roleRes.json(),
        ]);

        setStats({
          totalUsers: userData?.data?.totalUsers || 0,
          totalDocs: docData?.data?.totalDocs || 0,
          totalQuiz: quizData?.data?.totalQuiz || 0,
          userRoles: roleData?.data || [],
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="text-gray-500 p-6">Loading dashboard...</p>;
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={28} />,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Total Documents",
      value: stats.totalDocs,
      icon: <FileQuestion size={28} />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Total Quizzes",
      value: stats.totalQuiz,
      icon: <Activity size={28} />,
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "User Roles",
      value: stats.userRoles.length,
      icon: <BarChart3 size={28} />,
      color: "from-teal-500 to-cyan-600",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        Dashboard Overview
      </h1>
      <p className="text-gray-500 mb-6">Welcome back, Admin 👋</p>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((item, i) => (
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Analytics
        </h2>
        <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-400">📊 Chart will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
