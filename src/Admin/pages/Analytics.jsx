import React from "react";
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
  const userGrowth = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 450 },
    { month: "Mar", users: 700 },
    { month: "Apr", users: 900 },
    { month: "May", users: 1200 },
  ];

  const quizStats = [
    { quiz: "JS Basics", attempts: 200 },
    { quiz: "HTML/CSS", attempts: 150 },
    { quiz: "React", attempts: 300 },
    { quiz: "Node.js", attempts: 180 },
  ];

  const scoreDist = [
    { range: "0-40", count: 20 },
    { range: "41-60", count: 35 },
    { range: "61-80", count: 60 },
    { range: "81-100", count: 40 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Overview</h1>

      {/* USER GROWTH */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📈 User Growth
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* QUIZ PARTICIPATION */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          🧩 Quiz Participation
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={quizStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quiz" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="attempts" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SCORE DISTRIBUTION */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          🎯 Score Distribution
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={scoreDist}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
