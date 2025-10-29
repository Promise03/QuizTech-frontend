import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id || storedUser?.id; // ✅ handles both formats
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    totalQuizzes: 0,
    highScore: 0,
    totalPoints: 0,
    recentQuizzes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!userId || !token) return console.error("Missing user or token");

        const res = await axios.get(
          `${API_BASE_URL}/api/analytics/userdashboard/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("✅ Dashboard data:", res.data);

        if (res.data.success) {
          setStats(res.data);
        } else {
          console.error("Error:", res.data.message);
        }
      } catch (err) {
        console.error("❌ Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_BASE_URL, userId, token]);

  if (loading)
    return <p className="text-center text-gray-500 mt-20">Loading your dashboard...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-10">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">Quizzes Completed</h3>
              <p className="text-4xl font-bold text-indigo-700">{stats.totalQuizzes}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">High Score</h3>
              <p className="text-4xl font-bold text-indigo-700">{stats.highScore}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">Total Points</h3>
              <p className="text-4xl font-bold text-indigo-700">{stats.totalPoints}</p>
            </div>
          </div>

          {/* Recent Quizzes */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Recent Quizzes</h3>

            {stats.recentQuizzes.length === 0 ? (
              <p className="text-gray-500">No recent quizzes found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.recentQuizzes.map((quiz, index) => (
                  <div
                    key={quiz._id || index}
                    className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <h4 className="text-xl font-semibold mb-2">{quiz.quizTitle}</h4>
                    <p className="text-gray-600 mb-3">
                      Score:{" "}
                      <span className="text-indigo-600 font-bold">
                        {quiz.score}/{quiz.totalQuestions}
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
