import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";



const AdminAnalytics = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
  const [userGrowth, setUserGrowth] = useState([]);
  const [quizStats, setQuizStats] = useState([]);
  const [docStats, setDocStats] = useState([]);
  const [roleStats, setRoleStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [userRes, docRes, quizRes, roleRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/analytics/alluser`),
          fetch(`${API_BASE_URL}/api/analytics/allDoc`),
          fetch(`${API_BASE_URL}/api/analytics/allQuiz`),
          fetch(`${API_BASE_URL}/api/analytics/alluserbyrole`),
        ]);

        const [userData, docData, quizData, roleData] = await Promise.all([
          userRes.json(),
          docRes.json(),
          quizRes.json(),
          roleRes.json(),
        ]);

        // 🧩 Map user growth (per day)
        const formattedUserGrowth =
          userData?.data?.userAddedPerDay?.map((item) => ({
            date: item._id
              ? new Date(item._id).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "Unknown",
            users: item.userAdded,
          })) || [];

        // 🧩 Map quiz stats (per day)
        const formattedQuizStats =
          quizData?.data?.quizAddedPerDay?.map((item) => ({
            date: new Date(item._id).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            quizzes: item.quizAdded,
          })) || [];

        // 🧩 Map document stats (per day)
        const formattedDocStats =
          docData?.data?.docAddedPerDay?.map((item) => ({
            date: new Date(item._id).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            documents: item.docAdded,
          })) || [];

        // 🧩 Map user roles (Admin vs Student)
        const formattedRoleStats =
          roleData?.data?.map((role) => ({
            role: role._id,
            count: role.count,
          })) || [];

        setUserGrowth(formattedUserGrowth);
        setQuizStats(formattedQuizStats);
        setDocStats(formattedDocStats);
        setRoleStats(formattedRoleStats);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading analytics...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Overview</h1>

      {/* USER GROWTH */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          👥 User Growth Over Time
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* QUIZ ADDITIONS */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          🧩 Quizzes Added Per Day
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={quizStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quizzes" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* DOCUMENT CREATION */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📄 Documents Created Per Day
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={docStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="documents" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* USER ROLES DISTRIBUTION */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          🧠 Users by Role
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={roleStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
